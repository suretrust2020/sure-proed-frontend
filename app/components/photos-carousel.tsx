import useEmblaCarousel from "embla-carousel-react";
import {
  Card,
  Center,
  Flex,
  For,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useCarousel } from "@/hooks/useCarousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";

export default function PhotosCarousel({
  images,
  children,
  title,
}: {
  images: string[];
  children: React.ReactNode;
  title: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const {
    onNextButtonClick,
    onPrevButtonClick,
    nextBtnDisabled,
    prevBtnDisabled,
  } = useCarousel(emblaApi);

  return (
    <DialogRoot size="full">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent height={"50vh"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w={"full"} h={"full"}>
            <Center overflow="hidden" w={"full"} h={"full"} ref={emblaRef}>
              <Flex w="full" gap={4}>
                <For each={images}>
                  {(image, i) => (
                    <Card.Root
                      key={i}
                      overflow="hidden"
                      height={"auto"}
                      mx={"auto"}
                      flex="0 0 100%"
                      minW={0}
                      maxW={"md"}
                    >
                      <Image
                        src={image}
                        alt={title}
                        width={"full"}
                        height={"full"}
                        aspectRatio={"square"}
                      />
                    </Card.Root>
                  )}
                </For>
              </Flex>
            </Center>
            <Flex alignItems={"center"} gap={4}>
              <IconButton
                disabled={prevBtnDisabled}
                onClick={onNextButtonClick}
                flex={"none"}
                variant={"subtle"}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                disabled={nextBtnDisabled}
                onClick={onPrevButtonClick}
                flex={"none"}
                variant={"subtle"}
              >
                <ChevronRightIcon />
              </IconButton>
            </Flex>
          </VStack>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
