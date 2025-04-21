import { Box } from "@chakra-ui/react";
import ConfettiExplosion from "react-confetti-explosion";

export function Confetti() {
  const confettiOptions = {
    force: 0.8,
    duration: 5000,
    particleCount: 150,
    width: 1600,
  };
  return (
    <Box
      position={"absolute"}
      top={"10%"}
      left={"50%"}
      transform={"translate(-20%,-50%)"}
    >
      <ConfettiExplosion {...confettiOptions} />
    </Box>
  );
}
