import { fetchInternshipDetails } from "@/repositories/internships";
import type { Route } from "./+types/page";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { ProjectCard } from "./project-card";

export default function InternshipProjectDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Box py={12}>
      <Container maxW={"7xl"}>
        <Heading fontSize={"3xl"} mb={12}>
          Projects
        </Heading>
        <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
          {loaderData.domailDetails.PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              domain_name={loaderData.domailDetails.RESULT.domain_name}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const domainId = params.id;
  const domailDetails = await fetchInternshipDetails(domainId);
  return {
    domailDetails,
  };
}
