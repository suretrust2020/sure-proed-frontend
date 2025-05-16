import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { SITE_NAME } from "@/lib/constant";

import { fetchNotices } from "@/repositories/common";
import { getAuthData } from "@/auth.server";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useEffect } from "react";
import { Provider as ReactWrapBalanderProvider } from "react-wrap-balancer";

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const addAuthData = useAuthStore((state) => state.addAuthData);

  useEffect(() => {
    addAuthData(loaderData.authData);
  }, [loaderData.authData]);

  return (
    <ReactWrapBalanderProvider>
      <Outlet />
    </ReactWrapBalanderProvider>
  );
}

export function meta() {
  return [
    { title: SITE_NAME },
    {
      name: "description",
      content: `${SITE_NAME} - Skill Upgradation for Rural-youth Empowerment`,
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const noticesPromise = fetchNotices();
  const authData = await getAuthData(request);
  return {
    noticesPromise,
    authData,
  };
}
