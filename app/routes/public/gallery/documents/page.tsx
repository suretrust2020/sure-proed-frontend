import { Pagination } from "@/components/shared/pagination";
import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { fetchDocs } from "@/repositories/gallery";
import { ExternalLinkIcon } from "@/lib/icons";

export default function DocumentsGallery({ loaderData }: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} mx={"auto"} py={12}>
      <Heading fontSize={"2xl"} mb={6}>
        Documents
      </Heading>
      <SimpleGrid gap={4} columns={[1, 1, 2, 3]}>
        {loaderData.data.results.map(({ id, file, title }) => (
          <Card.Root size={"sm"}>
            <Card.Header>
              <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Footer justifyContent={"flex-end"}>
              <Button asChild size={"sm"} variant={"outline"}>
                <a href={file} target="_blank">
                  View
                  <ExternalLinkIcon />
                </a>
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
      <Flex mt={6} justify={"center"}>
        <Pagination count={loaderData.data.count} page={loaderData.page} />
      </Flex>
    </Container>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page") || 1);
  const data = await fetchDocs(page);
  return {
    data,
    page,
  };
}
