import { api } from "@/lib/api";
import { env } from "@/lib/env";
import type { AlumniUserType, Student } from "@/lib/types";

export async function fetchAlumni() {
  const response = await fetch(`${env.BASEURL}/student/alumni/`);
  const json = await response.json();
  return json as AlumniUserType[];
}

export async function fetchProfile(regNo?: number, token?: string) {
  try {
    const response = await api
      .url(`/student/student/${regNo}/`)
      .auth(`Token ${token}`)
      .get()
      .unauthorized(() => {
        throw new Error("Authentication failed.");
      })
      .json<Student>();

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message || "Something went wrong. Please try again.",
    };
  }
}
