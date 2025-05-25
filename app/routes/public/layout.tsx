import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@/components/sections/header";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { Footer } from "@/components/sections/footer";

import { fetchNotices } from "@/repositories/common";

export default function PublicLayout({ loaderData }: Route.ComponentProps) {
  return (
    <Flex flexDir="column" justifyContent="space-between" minH="100vh" h="full">
      <Header noticesPromise={loaderData.noticesPromise} />
      <Box as="main" h="full" flex={1} py={[6, 6, 8]}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export async function loader() {
  const noticesPromise = fetchNotices();

  return {
    noticesPromise,
  };
}
