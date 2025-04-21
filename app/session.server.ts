import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
  user_id: number;
  regno: number;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: process.env.NODE_ENV !== "development",
    },
  });

export { getSession, commitSession, destroySession };
