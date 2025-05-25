import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAuthSession } from "@/auth.server";

import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  return (
    <Flex flexDir="column" justifyContent="space-between" minH="100vh" h="full">
      <Header />
      <Box as="main" h="full" flex={1} py={[6, 6, 8]}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);
  if (!session.get("token")) {
    return redirect("/login");
  }
  return {};
}
