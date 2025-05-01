import { connectToMongo } from "@/lib/mongodb/connections";
import { Projects, type ProjectType } from "@/lib/mongodb/models/projects";
import type { GithubRepoType } from "@/lib/types";
import wretch from "wretch";
import { fetchCourseById } from "./courses";

export async function fetchGitHubRepoData(repoUrl?: string) {
  if (!repoUrl) return null;
  try {
    const match = repoUrl.match(
      /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/
    );
    if (!match) {
      throw new Error("Invalid GitHub repository URL.");
    }

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const data = await wretch(apiUrl)
      .get()
      .notFound(() => {
        throw new Error("Repository not found.");
      })
      .unauthorized(() => {
        throw new Error("Unauthorized access. Maybe you hit the rate limit.");
      })
      .error(429, () => {
        throw new Error("Rate limit exceeded. Try again later.");
      })
      .json<GithubRepoType>();

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      message: err.message || "Failed to fetch GitHub repository data.",
      success: false,
    };
  }
}

export const upsertProject = async (
  project: Omit<ProjectType, "_id" | "createdAt" | "updatedAt">
) => {
  await connectToMongo();
  const updatedProject = await Projects.findOneAndUpdate(
    { name: project.name, author: project.author }, // match both name + author
    { $set: project },
    { upsert: true, new: true }
  ).lean();

  return updatedProject;
};

export const getAllProjectsByCourseId = async (courseId: number) => {
  await connectToMongo();
  const projects = await Projects.find(
    { courseId },
    { createdAt: 0, updatedAt: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return projects.map(async (project) => ({
    ...project,
    _id: project._id.toString(),
    course: await fetchCourseById(project.courseId),
  }));
};

export const fetchFeaturedProjects = async () => {
  await connectToMongo();

  const groupedProjects = await Projects.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$courseId",
        doc: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$doc" } },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  const existingIds = groupedProjects.map((p) => p._id);

  const additionalProjects = await Projects.find(
    { _id: { $nin: existingIds } },
    { createdAt: 0, updatedAt: 0 }
  )
    .sort({ createdAt: -1 })
    .limit(10 - groupedProjects.length)
    .lean();

  const allProjects = [...groupedProjects, ...additionalProjects];

  return await Promise.all(
    allProjects.map(async (project: any) => ({
      ...project,
      _id: project._id.toString(),
      course: await fetchCourseById(project.courseId),
    }))
  );
};
