import { createSystem, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  strictTokens: true,
  cssVarsPrefix: "sure_trust",
});

export default createSystem(config);
