import { SITE_NAME, STUDENTS_UNDERGOING_TRAINING } from "@/lib/constant";
import { HOME_HERO_CONTENT } from "@/lib/data";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Badge,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Confetti from "react-confetti";

export function HeroSection() {
  return (
    <Box as="section" position="relative" overflow="hidden">
      <Container px={{ base: 4, sm: 6, lg: 8 }}>
        <Grid
          py={{ base: 12, md: 16, lg: 20 }}
          templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }}
          gap={{ base: 8, lg: 12 }}
          alignItems="center"
        >
          {/* Content */}
          <Box
            order={{ base: 2, lg: 1 }}
            display="flex"
            flexDir="column"
            gap={6}
          >
            <Box display="flex" flexDir="column" gap={4}>
              <Box mb={4}>
                <Badge colorPalette={"purple"} size={"lg"}>
                  {SITE_NAME} v3 beta launch
                  <ArrowRight size={16} />
                </Badge>
              </Box>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight={1}
              >
                {SITE_NAME}
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="fg.muted"
                maxW="2xl"
              >
                {HOME_HERO_CONTENT}
              </Text>
            </Box>

            <Flex flexDir={{ base: "column", sm: "row" }} gap={4} pt={2}>
              <Button
                size="lg"
                fontWeight="medium"
                fontSize="base"
                colorPalette={"purple"}
                asChild
              >
                <Link to="/signup">Register Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                fontWeight="medium"
                fontSize="base"
                display="inline-flex"
                alignItems="center"
                gap={2}
                role="group" // enables group hover
                px={6}
              >
                <Link to={"/courses"}>
                  <Text>Explore Internships</Text>
                  <Box as="span" className="arrow-icon">
                    <ArrowRight className="h-4 w-4" />
                  </Box>
                </Link>
              </Button>
            </Flex>

            <Flex alignItems="center" gap={4} pt={4}>
              <Text fontSize="sm" color="fg.muted">
                <Text as="span" fontWeight="semibold">
                  {STUDENTS_UNDERGOING_TRAINING}+
                </Text>{" "}
                students already learning
              </Text>
            </Flex>
          </Box>

          {/* Image */}
          <Box
            order={{ base: 1, lg: 2 }}
            display="flex"
            justifyContent={{ base: "center", lg: "end" }}
          >
            <Box
              position="relative"
              w="full"
              h="auto"
              rounded="2xl"
              overflow="hidden"
              shadow="xl"
            >
              <Image
                src="home-hero.jpeg"
                alt="Educational platform showcase"
                aspectRatio={"landscape"}
                w="full"
                h="auto"
                objectFit={"fill"}
              />

              {/* Decorative elements */}
            </Box>
          </Box>
        </Grid>
        <Confetti width={1400} height={600} numberOfPieces={100} />
      </Container>
    </Box>
  );
}
