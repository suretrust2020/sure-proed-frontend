import { ALUMNI_HERO_VIDEO_URL } from "@/lib/constant";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function AlumniHero() {
  return (
    <Box as="section" position="relative" overflow="hidden">
      <Container
        px={{ base: 4, md: 8 }}
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <VStack gap={10}>
          {/* Heading and Subtext */}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight={1.2}
            >
              Alumni Network
            </Heading>
            <Text
              mt={4}
              fontSize={{ base: "lg", md: "xl" }}
              color="fg.muted"
              maxW="3xl"
              mx="auto"
            >
              A Collaborative Community for Support, Care and Shared Success
            </Text>
          </Box>

          {/* Video Section */}
          <Box
            w="full"
            maxW="xl"
            rounded="2xl"
            overflow="hidden"
            boxShadow="2xl"
            mx="auto"
            aspectRatio={"auto"}
            h="280px"
          >
            <iframe
              src={ALUMNI_HERO_VIDEO_URL}
              style={{ width: "100%", height: "100%", border: "none" }}
              allowFullScreen
              loading="lazy"
              title="Alumni Hero Video"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
