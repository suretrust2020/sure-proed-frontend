import { env } from "@/lib/env";
import type { NoticeType } from "@/lib/types";

export async function fetchNotices() {
  try {
    const resp = await fetch(`${env.BASEURL}/home/notice/`);
    const data = await resp.json();
    return data as NoticeType[];
  } catch (error) {
    console.log(`error - fetchNotices()`);
    throw error;
  }
}
