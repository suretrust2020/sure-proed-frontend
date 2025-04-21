import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router";
export default function Error({ message, code }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        size="4xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        {code}
      </Heading>

      <Text fontSize="2xl" color={"gray.500"} mb={6}>
        {message}
      </Text>

      <Button
        as={Link}
        to="/"
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
      >
        Go to Home
      </Button>
    </Box>
  );
}
