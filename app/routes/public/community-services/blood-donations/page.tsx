import { Box, Container, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import { fetchBloodDonationStats } from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { ROUTES, SITE_NAME } from "@/lib/constant";
import { ServicesChart } from "../services-chart";
import { CourseCard } from "../course-card";
import { BloodIcon } from "@/lib/icons";

export default function PlatationsPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Box mb={8} bg="bg.muted" py={16}>
        <Container>
          <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
            <StatsCard count={loaderData.start} label={"Days"} />
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
          serviceType="Blood Donations"
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
                href={`/services-for-community/blood-donations/${course.course_name}`}
                serviceIcon={<BloodIcon />}
              />
            )}
          </For>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader() {
  const resp = await fetchBloodDonationStats();
  return resp;
}

export function meta() {
  return [
    {
      title: `Blood Donations | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
