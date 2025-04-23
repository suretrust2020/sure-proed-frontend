import { api } from "@/lib/api";
import type { T_User } from "@/types/user";

export async function signup(payload: any) {
  return api
    .url("/users/")
    .post(payload)
    .badRequest(async (err) => {
      const jsonData = await err.json();
      const formattedMessage = Object.entries(jsonData)
        .map(
          ([field, messages]) =>
            `${field}: ${(messages as string[]).join(", ")}`
        )
        .join("\n");

      return {
        success: false,
        message: formattedMessage,
        data: jsonData,
      };
    })
    .internalError(() => ({
      success: true,
      message: "Server error",
    }))
    .json<any>() // This must be last
    .then(() => ({
      success: true,
      message: "Signup successfully",
    }))
    .catch((err) => {
      return {
        success: false,
        message: "Internal server error occurred. Please try again later.",
      };
    });
}

export async function login(payload: any) {
  try {
    const resp = await api
      .url("/users/get-token/")
      .post(payload)
      .badRequest((err) => {
        throw new Error(err.message);
      })
      .internalError((err) => {
        throw new Error("Internal server error");
      })
      .json<any>(); // This must be last

    return {
      success: true,
      message: "Login successfully",
      data: resp,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export const fetchUserData = async (regno?: number, token?: string) => {
  if (!regno || !token) return null;
  const data = await api
    .url(`/student/student/${regno}/`)
    .headers({ Authorization: `Token ${token}` })
    .get()
    .json<T_User>();
  return data;
};
