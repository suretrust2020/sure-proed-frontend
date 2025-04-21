import { Box, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import React from "react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Tooltip label={colorMode === "dark" ? "Light" : "Dark"}>
        <IconButton onClick={toggleColorMode} aria-label="Toggle Theme">
          {colorMode === "light" ? (
            <RiMoonFill size={20} />
          ) : (
            <RiSunFill size={20} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
