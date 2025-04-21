import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./project-card";
import { Box, Flex, For } from "@chakra-ui/react";
import type { Project } from "@/lib/types";

export default function ProjectsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <Box overflow={"hidden"} ref={emblaRef}>
      <Flex w="full" gap={4} p={4}>
        <For each={projects}>
          {(project) => (
            <Flex
              key={project.id}
              flex={["0 0 100%", "0 0 50%", "0 0 33.333%", "0 0 25%"]} //
            >
              <ProjectCard project={project} />
            </Flex>
          )}
        </For>
      </Flex>
    </Box>
  );
}
