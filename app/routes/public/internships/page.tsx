import Hero from "@/components/hero";
import { INTERNSHIP_HERO_IMAGE_URL, SITE_NAME } from "@/lib/constant";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { CourseCard } from "./course-card";
import type { Route } from "./+types/page";
import { fetchInternshipsDomain } from "@/repositories/internships";

export default function AluminiPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Container maxW={"7xl"}>
        <Hero
          heading={`Internships at ${SITE_NAME}`}
          subHeading="Societally Beneficial Projects"
          content={
            "A Collaborative Community for Support, Care and Shared Success"
          }
          poster={{
            type: "img",
            url: INTERNSHIP_HERO_IMAGE_URL,
            title: "Alumni video",
          }}
        />
      </Container>
      <Box bg={"bg.muted"} py={12}>
        <Container maxW={"7xl"}>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Internship Projects at {SITE_NAME}
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
            {loaderData.domains.map((domain) => (
              <CourseCard
                key={domain.id}
                link={`/internships/${domain.id}`}
                name={domain.Name}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}

export async function loader() {
  const domains = await fetchInternshipsDomain();
  return {
    domains,
  };
}
