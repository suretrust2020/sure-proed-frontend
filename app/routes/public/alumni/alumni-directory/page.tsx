import { fetchAlumni } from "@/repositories/users";
import { Box, Container, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import type { Route } from "./+types/page";

import { useFilters } from "./use-filters";
import { AlumniUserCard } from "./alumni-user-card";
import { SearchInput } from "@/components/search-input";
import { ALumniFilter } from "./alumni-filter";

export default function AlumniDirectoryPage({
  loaderData,
}: Route.ComponentProps) {
  const { results } = useFilters({ users: loaderData.users });

  return (
    <Box>
      <Container>
        <Box>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
            Employed Alumni of SURE Trust
          </Heading>

          <SimpleGrid maxW={"4xl"} mx="auto" columns={[1, 2, 3, 4, 5]} gap={4}>
            <Box gridColumn={{ base: "span 1", md: "span 2" }}>
              <SearchInput />
            </Box>
            <Box gridColumn={{ base: "span 1", md: "span 2" }}>
              <ALumniFilter items={loaderData.courses} name="course" />
            </Box>
            <ALumniFilter items={loaderData.batches} name="batch" />
          </SimpleGrid>
        </Box>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4} mt={6}>
          {results.map((user, i) => (
            <AlumniUserCard key={i} {...user} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader() {
  const users = await fetchAlumni();
  const batches = Array.from(
    new Set(
      users.flatMap((alumni) => alumni.batches.map((batch) => batch.batch_name))
    )
  ).filter(Boolean);
  const courses = Array.from(
    new Set(
      users.flatMap((alumni) =>
        alumni.batches.map((batch) => batch.course__course_name)
      )
    )
  ).filter(Boolean);
  return {
    users,
    batches,
    courses,
  };
}
