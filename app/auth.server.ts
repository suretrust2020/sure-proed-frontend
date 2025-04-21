import { fetchUserData } from "./repositories/auth";
import { getSession } from "./session.server";

export async function getAuthSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return session;
}

export async function getAuthData(request: Request) {
  const session = await getAuthSession(request);
  const userData = await fetchUserData(
    session.get("regno"),
    session.get("token")
  );

  return userData;
}
