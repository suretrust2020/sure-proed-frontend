import type { Config } from "@react-router/dev/config";

const prerenderPaths = [
  "/about",
  "contacts",
  "/website-developers",
  "/lifeskills-training-program",
];
export default {
  ssr: true,
  async prerender() {
    return prerenderPaths;
  },
} satisfies Config;
