import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "./user-card";
import { fetchPlantationById } from "@/repositories/community-services";
import type { Route } from "./+types/page";

export default function PlantationDetailsPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} py={12}>
      <Heading fontSize={"2xl"} mb={6}>
        {params.id}
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
        {loaderData.plantations.map((plantation) => (
          <UserCard plantation={plantation} key={plantation._id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const parsedId = decodeURIComponent(id);
  const plantations = await fetchPlantationById(parsedId);
  return {
    plantations,
  };
}
