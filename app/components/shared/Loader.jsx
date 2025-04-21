import { Box, Spinner, Text } from "@chakra-ui/react";

function Loader() {
  return (
    <Box pos="relative" minH="100vh">
      <Box pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
        <Box display="flex" alignItems="center">
          <Spinner thickness="4px" size="xl" />
        </Box>
      </Box>
    </Box>
  );
}

export default Loader;
