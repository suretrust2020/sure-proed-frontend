"use client";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import Confetti from "react-confetti";

export function ConfettiBlast() {
  // Responsive width and height
  const width = useBreakpointValue({
    base: window.innerWidth,
    md: window.innerWidth,
  });
  const height = useBreakpointValue({
    base: window.innerHeight,
    md: window.innerHeight,
  });

  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      zIndex="overlay"
      pointerEvents="none"
    >
      <Confetti
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        numberOfPieces={200}
        gravity={0.3}
        recycle={false}
        tweenDuration={5000}
      />
    </Box>
  );
}
