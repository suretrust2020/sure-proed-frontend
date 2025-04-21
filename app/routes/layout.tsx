import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@/components/sections/header";
import { Toaster } from "@/components/ui/toaster";
import { Provider as ReactWrapBalanderProvider } from "react-wrap-balancer";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { SITE_NAME } from "@/lib/constant";
import { Footer } from "@/components/sections/footer";
import { Providers } from "@/providers";
import { fetchNotices } from "@/repositories/common";
import { getAuthData } from "@/auth.server";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useEffect } from "react";

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const addAuthData = useAuthStore((state) => state.addAuthData);

  useEffect(() => {
    addAuthData(loaderData.authData);
  }, [loaderData.authData]);

  return (
    <Providers>
      <ReactWrapBalanderProvider>
        <Flex
          flexDir="column"
          justifyContent="space-between"
          minH="100vh"
          h="full"
        >
          <Header noticesPromise={loaderData.noticesPromise} />
          <Box as="main" h="full" flex={1} py={[6, 6, 8]}>
            <Outlet />
          </Box>
          <Footer />
        </Flex>
        <Toaster />
      </ReactWrapBalanderProvider>
    </Providers>
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
