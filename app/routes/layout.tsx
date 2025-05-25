import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { SITE_NAME } from "@/lib/constant";

import { getAuthData, getFeatureAccess } from "@/auth.server";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useEffect } from "react";
import { Provider as ReactWrapBalanderProvider } from "react-wrap-balancer";
import { Toaster } from "@/components/ui/toaster";
import { NavigationProgress } from "@/components/navigation-progress";

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const addAuthData = useAuthStore((state) => state.addAuthData);
  const setFeatureAccess = useAuthStore((state) => state.setFeatureAccess);

  useEffect(() => {
    addAuthData(loaderData.authData);
    setFeatureAccess(loaderData.featureAccess);
  }, [loaderData.authData, loaderData.featureAccess]);

  return (
    <ReactWrapBalanderProvider>
      <NavigationProgress />
      <Outlet />
      <Toaster />
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
  const authData = await getAuthData(request);
  const featureAccess = getFeatureAccess(authData?.user.id);
  return {
    authData,
    featureAccess,
  };
}
