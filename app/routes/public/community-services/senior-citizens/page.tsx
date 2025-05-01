import { Box, Container, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import { fetchSeniorCitizensStats } from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { COMMUNITY_SERVICES, SITE_NAME } from "@/lib/constant";
import { ServicesChart } from "../services-chart";
import { CourseCard } from "../course-card";
import { HelpIcon } from "@/lib/icons";
import { calculateTimeDifferenceFromNow } from "@/lib/utils";

export default function SeniorCitizensPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Box>
      <Box mb={8}>
        <Container>
          <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
            <StatsCard
              count={calculateTimeDifferenceFromNow(
                COMMUNITY_SERVICES.seniorCitizenStartTimestamp
              )}
              label={"Days"}
              showPlus
            />
            <StatsCard
              count={loaderData.volunteers}
              label={"Volunteers"}
              showPlus
            />
            <StatsCard
              count={loaderData.courses.length}
              label={"Courses"}
              showPlus
            />
          </SimpleGrid>
        </Container>
      </Box>
      <Container display={["none", "none", "block"]}>
        <ServicesChart
          serviceType="Senior Citizen"
          courses={loaderData.courses}
        />
      </Container>

      <Container mt={8}>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
          <For each={loaderData.courses}>
            {(course) => (
              <CourseCard
                course={course}
                key={course.course_name}
                href={`/services-for-community/senior-citizens/${course.course_name}`}
                serviceIcon={<HelpIcon />}
              />
            )}
          </For>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader() {
  const resp = await fetchSeniorCitizensStats();
  return resp;
}

export function meta() {
  return [
    {
      title: `Senior Citizens | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
