import { api } from "@/lib/api";
import { env } from "@/lib/env";
import type {
  Course,
  CourseListType,
  CourseTeacher,
  PaginatedResp,
} from "@/lib/types";

async function fetchCourses(category: string, page: number) {
  try {
    const resp = await fetch(
      `${env.BASEURL}/courses/get_courses_by_param/?category=${category}&page=${page}`
    );
    const data = await resp.json();
    return data as PaginatedResp<CourseListType>;
  } catch (error) {
    console.log("courses fetch error");
    throw error;
  }
}

async function fetchFeaturedCourses() {
  try {
    const resp = await fetch(
      `${env.BASEURL}/courses/get_courses_by_param/?category=NON MEDICAL&page=1`
    );
    const data = await resp.json();
    return data.results as CourseListType[];
  } catch (error) {
    console.log("courses fetch error");
    throw error;
  }
}

async function fetchCourseTeachers(id: number) {
  try {
    const resp = await fetch(
      `${env.BASEURL}/courses/get-course-teachers/${id}/`
    );

    const data = await resp.json();
    return data as CourseTeacher[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchCourseById(id: number) {
  try {
    const resp = await fetch(`${env.BASEURL}/courses/get-course/${id}/`);
    const data = await resp.json();
    return data as Course;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchAllCourses() {
  try {
    const resp = await fetch(
      `${env.BASEURL}/courses/get-all-courses-for-signup/`
    );
    const data = await resp.json();
    return data as CourseListType[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function enrollCourse(courseId?: number, token?: string) {
  if (!courseId || !token) {
    throw new Error("Missing course ID or token. Please try again later.");
  }

  try {
    const response = await api
      .url(`/users/add-to-course/${courseId}/`)
      .auth(`Token ${token}`)
      .post()
      .unauthorized(() => {
        throw new Error("Authentication failed.");
      })
      .json<any>();

    if (response.error) {
      throw new Error(response.error);
    }
    return {
      success: true,
      data: response,
      message: "Enrolled successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message || "Something went wrong. Please try again.",
    };
  }
}

export {
  fetchCourses,
  fetchCourseTeachers,
  fetchCourseById,
  fetchAllCourses,
  fetchFeaturedCourses,
};
