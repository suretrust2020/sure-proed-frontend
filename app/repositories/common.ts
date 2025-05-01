import { api } from "@/lib/api";
import type { NoticeType } from "@/lib/types";
export async function fetchNotices() {
  try {
    const data = await api.get(`/home/notice`).json();
    return data as NoticeType[];
  } catch (error: any) {
    console.error("API error:", error);
    return [];
  }
}
