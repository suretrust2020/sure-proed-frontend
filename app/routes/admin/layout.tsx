import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAuthData } from "@/auth.server";

import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { env } from "@/lib/env";
import { SidebarLinks } from "./sidebar-links";
import { AdminBreadcrumbs } from "./admin-breadcrumbs";
import { Logo } from "@/components/logo";

export default function ProtectedLayout() {
  return (
    <Stack gap={0} direction={"row"}>
      <Flex
        as="aside"
        h={"vh"}
        width={"240px"}
        overflowY={"auto"}
        borderRight={"1px solid"}
        borderColor={"gray.muted"}
        direction={"column"}
        flex={"none"}
      >
        <Box
          height={12}
          borderBottom={"1px solid"}
          borderColor={"gray.muted"}
          display={"flex"}
          alignItems={"center"}
          px={4}
          gap={2}
        >
          <Logo compressed width={8} height={8} />
          <Heading size={"md"}>Admin Dashboard</Heading>
        </Box>
        <Box px={2} py={4}>
          <SidebarLinks />
        </Box>
      </Flex>
      <Flex direction={"column"} as="main" h={"vh"} flex={1} overflowY={"auto"}>
        <Box
          as={"header"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
          px={4}
          borderBottom={"1px solid"}
          borderColor={"gray.muted"}
          height={12}
          flex={"none"}
          pos={"sticky"}
          top={0}
          background={"bg"}
          zIndex={10}
        >
          <AdminBreadcrumbs />
        </Box>
        <Box flex={"none"} p={4}>
          <Outlet />
        </Box>
      </Flex>
    </Stack>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthData(request);
  if (!session) {
    return redirect("/login");
  }
  let authorized = false;
  if (session?.user) {
    authorized = false;
    authorized = !!env.ADMIN_USERS?.split(",")
      .filter(Boolean)
      .includes(String(session.user.id));
  }

  if (!authorized) {
    return redirect("/login");
  }

  return {};
}
