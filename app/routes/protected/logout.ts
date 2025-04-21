import { getAuthSession } from "@/auth.server";
import type { Route } from "./+types/layout";
import { redirect } from "react-router";
import { destroySession } from "@/session.server";

export async function action({ request }: Route.ActionArgs) {
  const session = await getAuthSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
