import { env } from "@/lib/env";
import type { InternshipDetailsType, InternshipDomainType } from "@/lib/types";

export async function fetchInternshipsDomain() {
  try {
    const resp = await fetch(`${env.BASEURL}/courses/domain/`);
    const data = await resp.json();
    return data?.domain_list as InternshipDomainType[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchInternshipDetails(id: string) {
  try {
    const resp = await fetch(`${env.BASEURL}/courses/get_domain/${id}/`);
    const data = await resp.json();
    return data as InternshipDetailsType;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
