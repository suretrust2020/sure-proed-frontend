import { api } from "@/lib/api";
export async function fetchNotices() {
  try {
    const data = await api.get(`/home/notice`).json();
    return data;
  } catch (error: any) {
    console.error("API error:", error);
    return [];
  }
}
