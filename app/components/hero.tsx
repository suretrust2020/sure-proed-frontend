import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router";

type Action = {
  label: string;
  href: string;
};
type HeroProps = {
  primaryAction?: Action;
  secondaryAction?: Action;
  heading: any;
  subHeading?: string;
  content?: string;
  poster?: {
    type: "img" | "video";
    url: string;
    title: string;
  };
};
export default function Hero({
  primaryAction,
  secondaryAction,
  content,
  heading,
  poster,
  subHeading,
}: HeroProps) {
  return (
    <Stack
      align={"center"}
      gap={{ base: 8, md: 10 }}
      py={{ base: 12, md: 16 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack
        flex={1}
        gap={{ base: 5, md: 10 }}
        maxW={poster ? "none" : "3xl"}
        mx="auto"
        w={"full"}
        textAlign={poster ? "start" : "center"}
      >
        <Stack align={poster ? "start" : "center"}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
          >
            {heading}

            <br />
            {subHeading && <Text as={"span"}>{subHeading}</Text>}
          </Heading>
          {content && (
            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              color={{ base: "gray.600", _dark: "gray.200" }}
            >
              {content}
            </Text>
          )}
        </Stack>

        <Flex gap={4} justifyContent={poster ? "start" : "center"}>
          {primaryAction && (
            <Button
              size={"lg"}
              asChild
              variant={"solid"}
              colorPalette={"purple"}
              px={6}
            >
              <Link to={primaryAction.href}> {primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button size={"lg"} asChild variant={"subtle"} px={6}>
              <Link to={secondaryAction.href}> {secondaryAction.label}</Link>
            </Button>
          )}
        </Flex>
      </Stack>
      {poster && (
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          {poster?.type === "img" && (
            <Image
              src={poster.url}
              alt={poster.title}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
              loading="lazy"
              rounded={"lg"}
              overflow={"hidden"}
            />
          )}
          {poster?.type === "video" && (
            <Box
              alignItems={"center"}
              w={"100%"}
              h={"300px"}
              asChild
              rounded={"xl"}
            >
              <iframe
                src={poster.url}
                allowFullScreen
                loading="lazy"
                title={poster.title}
              />
            </Box>
          )}
        </Flex>
      )}
    </Stack>
  );
}
