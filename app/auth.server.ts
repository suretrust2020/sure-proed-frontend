import { env } from "./lib/env";
import { fetchUserData } from "./repositories/auth";
import { getSession } from "./session.server";
import type { T_Feature_Access } from "./types/user";

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

export function getFeatureAccess(userId: any) {
  const adminAccess = hasAccess("admin", userId);
  const communityServiceAcess = hasAccess("community-services", userId);
  const featureAccess: T_Feature_Access[] = [];

  if (adminAccess) featureAccess.push("admin");
  if (communityServiceAcess) featureAccess.push("community-services");
  return featureAccess;
}

function hasAccess(features: "admin" | "community-services", userId: any) {
  if (!userId) return false;
  switch (features) {
    case "admin":
      return env.ADMIN_USERS?.split(",").includes(String(userId));
    case "community-services":
      return env.COMMUNITY_SERVICES_USERS?.split(",").includes(String(userId));

    default:
      return false;
  }
}
