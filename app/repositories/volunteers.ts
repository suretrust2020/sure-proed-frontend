import { env } from "@/lib/env";
import type { VolunteerType } from "@/lib/types";

export async function getVolunteers() {
  try {
    const resp = await fetch(`${env.BASEURL}/teacher/volunteer/`);
    const data = await resp.json();
    return data as VolunteerType[];
  } catch (error) {
    console.log("getVolunteers error", error);
    throw error;
  }
}
