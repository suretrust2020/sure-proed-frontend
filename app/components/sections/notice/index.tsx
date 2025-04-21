import type { NoticeType } from "@/lib/types";
import { Box, Flex, For } from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { NoticeDetails } from "./notice-details";

export function Notice({ notices }: { notices: NoticeType[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <Box
      overflow="hidden"
      ref={emblaRef}
      bgImage="linear-gradient(to right, {colors.teal.700}, {colors.purple.500})"
    >
      <Flex>
        <For each={notices}>
          {(notice) => (
            <Box key={notice.id} flex={"0 0 100%"}>
              <NoticeDetails {...notice} />
            </Box>
          )}
        </For>
      </Flex>
    </Box>
  );
}
