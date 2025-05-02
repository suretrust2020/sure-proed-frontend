import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAuthSession } from "@/auth.server";

export default function ProtectedLayout() {
  return <Outlet />;
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);
  if (!session.get("token")) {
    return redirect("/login");
  }
  return {};
}
