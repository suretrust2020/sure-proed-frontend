import { Box, Center } from "@chakra-ui/react";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getSession } from "@/session.server";

export default function AuthLayout() {
  return (
    <Center h="full" px={4}>
      <Box maxW={"md"} w="full" mx="auto">
        <Outlet />
      </Box>
    </Center>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return redirect("/");
  }
}
