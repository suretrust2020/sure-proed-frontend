import { Center, Container, Flex } from "@chakra-ui/react";
import { Header } from "@/components/sections/header";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { getAuthSession } from "@/auth.server";

export default function PublicLayout() {
  return (
    <Flex flexDir="column" justifyContent="space-between" minH="100vh" h="full">
      <Header />

      <Center w="full" h="full" flex={1}>
        <Container maxW={"lg"}>
          <Outlet />
        </Container>
      </Center>
    </Flex>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);
  if (session.has("token")) {
    return redirect("/");
  }

  return null;
}
