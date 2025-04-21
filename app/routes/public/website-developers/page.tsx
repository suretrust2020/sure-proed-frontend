import { getWebsiteDevelopers } from "@/repositories/data";
import { Box, Container, For, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { DeveloperCard } from "./developer-card";
import { SITE_NAME } from "@/lib/constant";

export default function WebsiteDevelopersPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} mx={"auto"} py={12}>
      <Box>
        <Heading fontSize={"2xl"} mb={6}>
          Current Website Management Team
        </Heading>
        <SimpleGrid gap={4} columns={[1, 2, 3, 4]}>
          {loaderData.currentManagementTeams.map((user) => (
            <DeveloperCard key={user.name} {...user} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={12}>
        <Heading fontSize={"2xl"} mb={6}>
          Past Website Management Team
        </Heading>
        <SimpleGrid gap={4} columns={[1, 2, 3, 4]}>
          <For each={loaderData.pastManagementTeams}>
            {(user) => <DeveloperCard key={user.name} {...user} />}
          </For>
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export async function loader() {
  const developers = await getWebsiteDevelopers();
  return developers;
}

export function meta() {
  return [
    {
      title: `Website Management & Developers | ${SITE_NAME}`,
      name: "description",
      content:
        "Meet our talented team of website developers and managers who specialize in crafting innovative, high-quality web solutions. Learn more about the expertise that drives our success.",
    },
  ] satisfies Route.MetaDescriptors;
}
