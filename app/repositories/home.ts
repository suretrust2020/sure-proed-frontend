import {
  ONGOING_BATCHES,
  STUDENTS_COMPLETED_TRAINING,
  STUDENTS_PLACED,
  STUDENTS_UNDERGOING_TRAINING,
} from "@/lib/constant";
import { env } from "@/lib/env";
import type { Collaborator, Feature, Project, Stat } from "@/lib/types";

async function fetchFeatures() {
  try {
    const resp = await fetch(`${env.BASEURL}/home/about-suretrust/`);
    const data = await resp.json();
    return data as Feature[];
  } catch (error) {
    console.log(error);
    throw new Error("features fetch error");
  }
}

async function fetchStats() {
  try {
    const resp = await fetch(`${env.BASEURL}/community/get_count`);
    const stats = await resp.json();
    const restStats = {
      ongoingBatches: ONGOING_BATCHES,
      studentsPlaced: STUDENTS_PLACED,
      studentCompletedTraining: STUDENTS_COMPLETED_TRAINING,
      studentsUndergoingTraining: STUDENTS_UNDERGOING_TRAINING,
    };

    const statsData: Stat = {
      courses: stats.Result.course_count,
      batches: stats.Result.batch_count,
      trainers: stats.Result.trainer_count,
      ...restStats,
    };

    return statsData;
  } catch (error) {
    console.log(error);
    throw new Error("stats fetch error");
  }
}

async function fetchProjects() {
  try {
    const projectsResp = await fetch(`${env.BASEURL}/courses/projects/`);
    const projectsData = (await projectsResp.json()) as { results: Project[] };
    return projectsData.results;
  } catch (error) {
    console.log(error);
    throw new Error("internship projects fetch error");
  }
}

async function fetchCollaborators() {
  try {
    const resp = await fetch(`${env.BASEURL}/home/collaborator/`);
    const data = await resp.json();
    return data as Collaborator[];
  } catch (error) {
    console.log("collaborators fetch error");
    console.log(error);
    throw new Error("collaborators fetch error");
  }
}
export { fetchFeatures, fetchStats, fetchProjects, fetchCollaborators };
