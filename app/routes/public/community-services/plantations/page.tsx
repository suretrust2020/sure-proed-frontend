import { Box, Container, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import {
  fetchPlantationData,
  fetchPlantationStats,
} from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { SITE_NAME } from "@/lib/constant";
import { CourseCard } from "../course-card";
import { PlantIcon } from "@/lib/icons";
import { ServicesChart } from "../services-chart";

export default function PlatationsPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Box mb={8} bg="bg.muted" py={16}>
        <Container>
          <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
            <StatsCard count={loaderData.stats.start} label={"Days"} showPlus />
            <StatsCard
              count={loaderData.stats.volunteers}
              label={"Planters"}
              showPlus
            />
            <StatsCard
              count={loaderData.stats.plants}
              label={"Plants"}
              showPlus
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Container display={["none", "none", "block"]}>
        <ServicesChart serviceType="Plantations" courses={loaderData.courses} />
      </Container>

      <Container mt={8}>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
          <For each={loaderData.courses}>
            {(plantation) => (
              <CourseCard
                serviceIcon={<PlantIcon />}
                course={plantation}
                key={plantation._id}
                href={`/services-for-community/plantations/${plantation.course_name}`}
              />
            )}
          </For>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader() {
  const plantationData = await fetchPlantationData();
  const stats = await fetchPlantationStats();

  return {
    courses: plantationData.map((p) => ({ ...p, course_name: p._id })),
    stats,
  };
}

export function meta() {
  return [
    {
      title: `Plantations | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
