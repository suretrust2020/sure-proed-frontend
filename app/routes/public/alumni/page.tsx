import Hero from "@/components/hero";
import { ALUMNI_HERO_VIDEO_URL } from "@/lib/constant";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { AlumniCard } from "./alumni-card";
import AlumniHero from "./alumni-hero";

export default function AluminiPage() {
  return (
    <Box>
      <Container>
        <AlumniHero />
      </Container>
      <Box bg={"bg.muted"} py={12}>
        <Container>
          <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
            <AlumniCard
              poster="/alumni.jpg"
              title="Alumni Directory"
              description="Search for Alumni profiles for networking."
              href="alumni-directory"
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
