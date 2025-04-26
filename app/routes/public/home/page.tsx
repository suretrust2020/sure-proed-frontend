import { HOME_HERO_VIDEO_URL, SITE_NAME } from "@/lib/constant";
import { Box, Heading, Container, Stack } from "@chakra-ui/react";
import { DashboardStats } from "./dashboard-stats";
import type { Route } from "./+types/page";
import {
  fetchCollaborators,
  fetchFeatures,
  fetchProjects,
  fetchStats,
} from "@/repositories/home";
import { WhyUs } from "./why-us";
import ProjectsCarousel from "./projects-carousel";
import { Collaborators } from "./collaborators";
import { HOME_HERO_CONTENT } from "@/lib/data";
import { HeroSection } from "./hero-section";

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <Stack gap={12}>
      <HeroSection />

      <Box bg={"bg.muted"} py={12}>
        <Container>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Our Impact
          </Heading>
          <DashboardStats stats={loaderData.stats} />
        </Container>
      </Box>
      <Container>
        <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
          Why Choose Us
        </Heading>
        <WhyUs features={loaderData.features} />
      </Container>

      {/* <Container>
        <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
          Internship Projects
        </Heading>
        <ProjectsCarousel projects={loaderData.projects} />
      </Container> */}

      <Box py={12}>
        <Container>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Collaborators
          </Heading>
          <Collaborators collaborators={loaderData.collaborators} />
        </Container>
      </Box>
    </Stack>
  );
}

export async function loader() {
  const stats = await fetchStats();
  const features = await fetchFeatures();
  const projects = await fetchProjects();
  const collaborators = await fetchCollaborators();

  return {
    stats,
    features,
    projects,
    collaborators,
  };
}

export function meta() {
  return [
    {
      title: `Home | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
