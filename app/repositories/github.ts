import wretch from "wretch";

export type T_GithubRepo = {
  title: string;
  repo_link: string;
  author: string;
  description: string;
  language: string;
};
const GITHUB_OWNER = "sure-trust";
const GITHUB_REPO = "projects";

/**
 * Fetches GitHub project links from a course markdown file based on course ID.
 * @param courseId number like `42`
 * @returns Array of objects: [{ name, url }]
 */
export async function fetchGithubProjects(courseId: string) {
  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
    const headers = {
      Accept: "application/vnd.github.v3.raw",
    };

    // 1. Get all files in root
    const files: any[] = await wretch(fileUrl).headers(headers).get().json();

    // 2. Find file containing course ID in its name
    const courseFile = files.find((file) =>
      file.name.endsWith(`_${courseId}.json`)
    );

    if (!courseFile) {
      throw new Error(`No course file found for ID ${courseId}`);
    }

    // 3. Fetch file content
    const content: string = await wretch(courseFile.download_url)
      .headers(headers)
      .get()
      .json();

    return content as unknown as T_GithubRepo[];
  } catch (error) {
    return [];
  }
}
