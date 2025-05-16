import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@/components/sections/header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { Footer } from "@/components/sections/footer";

import { fetchNotices } from "@/repositories/common";
import { NavigationProgress } from "@/components/navigation-progress";

export default function PublicLayout({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        minH="100vh"
        h="full"
      >
        <NavigationProgress />
        <Header noticesPromise={loaderData.noticesPromise} />
        <Box as="main" h="full" flex={1} py={[6, 6, 8]}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
      <Toaster />
    </Box>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const noticesPromise = fetchNotices();

  return {
    noticesPromise,
  };
}
