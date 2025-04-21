import { Container, Flex, For, Heading, SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "../../user-card";
import { fetchBloodDonation } from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { Pagination } from "@/components/shared/pagination";

export default function BloodDonationsDetailsPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} py={12}>
      <Heading fontSize={"2xl"} mb={6}>
        {params.id}
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
        <For each={loaderData.data.results}>
          {(user) => (
            <UserCard
              key={user.id}
              courseName={user.course_name}
              imageUrl={user.image_url}
              name={user.donar_name}
              role={user.user_role?.split("_").join(" ")}
            />
          )}
        </For>
      </SimpleGrid>
      <Flex mt={6} justify={"center"}>
        <Pagination count={loaderData.data.count} page={loaderData.page} />
      </Flex>
    </Container>
  );
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page") || 1);
  const data = await fetchBloodDonation(page, id);
  return {
    data,
    page,
  };
}
