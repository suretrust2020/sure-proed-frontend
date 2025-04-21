import type {
  ApiResponse,
  DocumentType,
  PictureType,
  VideoType,
} from "@/lib/types";
import { env } from "@/lib/env";

async function fetchPictures(page: number) {
  try {
    const resp = await fetch(
      `${env.BASEURL}/gallery/get-all-images/?page=${page}`
    );
    const data = await resp.json();
    return data as ApiResponse<PictureType>;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchVideos(page: number) {
  try {
    const resp = await fetch(
      `${env.BASEURL}/gallery/get-all-video/?page=${page}`
    );
    const data = await resp.json();
    return data as ApiResponse<VideoType>;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchDocs(page: number) {
  try {
    const resp = await fetch(`${env.BASEURL}/gallery/documents/?page=${page}`);
    const data = await resp.json();
    return data as ApiResponse<DocumentType>;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { fetchPictures, fetchVideos, fetchDocs };
