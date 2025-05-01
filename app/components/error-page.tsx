import { BookOpen, Home } from "lucide-react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  chakra,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router"; // Assuming react-router-dom for navigation
import { Logo } from "./logo";
import { SITE_LOGO_URL } from "@/lib/constant";

export default function ErrorPage({
  status,
  message,
  statusText,
}: {
  status: number;
  message: string;
  statusText: string;
}) {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
      textAlign="center"
    >
      {/* Animated Circle with Question Mark */}
      <Avatar.Root colorPalette={"purple"} w="104px" h={"104px"} mb={12}>
        <Avatar.Image w="80px" h={"80px"} src={SITE_LOGO_URL} />
      </Avatar.Root>

      {/* 404 Heading */}
      <Heading
        as="h1"
        mb={6}
        fontSize={{ base: "5xl", sm: "6xl" }}
        fontWeight="extrabold"
        color="purple.500"
        lineHeight="tight"
      >
        {status}
      </Heading>

      {/* Page Not Found Subtitle */}
      <Heading
        as="h2"
        mb={6}
        fontSize={{ base: "2xl", sm: "3xl" }}
        fontWeight="bold"
        colorPalette={"gray"}
        lineHeight="tight"
      >
        {statusText}
      </Heading>

      {/* Description Text */}
      <Text mb={8} maxW="md" fontSize="lg" color="gray">
        {message}
      </Text>

      {/* Navigation Buttons */}
      <Flex direction={{ base: "column", sm: "row" }} gap={4}>
        <Button asChild colorPalette={"purple"}>
          <Link to="/">
            <Home />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant={"subtle"}>
          <Link to="/courses">
            <BookOpen size={16} />
            Browse Internships
          </Link>
        </Button>
      </Flex>

      {/* Floating Dots Animation */}
      <Flex mt={16} justify="center" gap={8} wrap="wrap">
        {[1, 2, 3, 4, 5].map((i) => (
          <chakra.div
            key={i}
            w="8px"
            h="8px"
            borderRadius="full"
            bg="purple.300"
            opacity={0.7}
            animation={"pulse"}
          />
        ))}
      </Flex>
    </Box>
  );
}
