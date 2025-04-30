import type { CourseListType } from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Flex, For } from "@chakra-ui/react";
import { CourseCard } from "@/components/courses/course-card";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/hooks/carousel/use-prev-next-btn";

export function FeaturedCourses({ courses }: { courses: CourseListType[] }) {
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
        <For each={courses}>
          {(course) => (
            <Flex
              key={course.id}
              flex={["0 0 100%", "0 0 50%", "0 0 33.333%", "0 0 25%"]}
            >
              <CourseCard course={course} />
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
