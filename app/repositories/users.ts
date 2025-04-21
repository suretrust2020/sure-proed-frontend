import { env } from "@/lib/env";
import type { AlumniUserType } from "@/lib/types";

export async function fetchAlumni() {
  const response = await fetch(`${env.BASEURL}/student/alumni/`);
  const json = await response.json();
  return json as AlumniUserType[];
}
