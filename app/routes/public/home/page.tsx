import { SITE_NAME } from "@/lib/constant";
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
import { Collaborators } from "./collaborators";
import { HeroSection } from "./hero-section";
import { fetchFeaturedCourses } from "@/repositories/courses";
import { FeaturedCourses } from "./featured-courses";
import { Await } from "react-router";
import React from "react";
import { fetchFeaturedProjects } from "@/repositories/projects";
import { ProjectCard } from "./project-card";
import { FeaturedProjects } from "./featured-projects";

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

      <Box bg={"bg.muted"} py={12}>
        <Container>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Featured Internships
          </Heading>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Await resolve={loaderData.featuredCoursesPromise}>
              {(courses) => <FeaturedCourses courses={courses} />}
            </Await>
          </React.Suspense>
        </Container>
      </Box>
      <Box py={12}>
        <Container>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Featured Projects
          </Heading>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Await resolve={loaderData.featuredProjectsPromise}>
              {(projects) => <FeaturedProjects projects={projects} />}
            </Await>
          </React.Suspense>
        </Container>
      </Box>

      <Box>
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
  const [stats, features, projects, collaborators] = await Promise.all([
    fetchStats(),
    fetchFeatures(),
    fetchProjects(),
    fetchCollaborators(),
  ]);

  const featuredCoursesPromise = fetchFeaturedCourses();
  const featuredProjectsPromise = fetchFeaturedProjects();

  return {
    stats,
    features,
    projects,
    collaborators,
    featuredCoursesPromise,
    featuredProjectsPromise,
  };
}

export function meta() {
  return [
    {
      title: `Home | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
