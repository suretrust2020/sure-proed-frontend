import useEmblaCarousel from "embla-carousel-react";
import { Box, Flex, For } from "@chakra-ui/react";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/hooks/carousel/use-prev-next-btn";
import type { ProjectType } from "@/lib/mongodb/models/projects";
import { ProjectCard } from "@/components/github-project-card";

export function FeaturedProjects({ projects }: { projects: ProjectType[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  return (
    <Box position="relative" overflow="hidden" ref={emblaRef}>
      <Flex w="full" gap={4}>
        <For each={projects}>
          {(project) => (
            <Flex
              key={project._id}
              flex={["0 0 100%", "0 0 50%", "0 0 33.333%", "0 0 25%"]}
            >
              <ProjectCard {...project} />
            </Flex>
          )}
        </For>
      </Flex>

      <Flex justifyContent={"flex-end"} mt={4} gap={2}>
        <Flex gap={2}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </Flex>
      </Flex>
    </Box>
  );
}
