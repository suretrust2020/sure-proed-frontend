import { Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

export function CommingSoon() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={"50px"} color={"blue.300"} />
      <Heading maxW={"md"} mx="auto" as="h2" size="xl" mt={6} mb={2}>
        Something Exciting is Coming Soon!
      </Heading>
    </Box>
  );
}
