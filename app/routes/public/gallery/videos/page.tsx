import { Pagination } from "@/components/shared/pagination";
import { fetchVideos } from "@/repositories/gallery";
import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Route } from "./+types/page";

export default function VideoGalleryPage({ loaderData }: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} mx={"auto"} py={12}>
      <Heading fontSize={"2xl"} mb={6}>
        Videos
      </Heading>
      <SimpleGrid gap={4} columns={[1, 1, 2, 3]}>
        {loaderData.data.results.map(({ id, video_name }) => (
          <AspectRatio ratio={1} key={id} borderWidth={"8px"}>
            <Box asChild>
              <iframe
                src={`https://www.youtube.com/embed/${video_name}`}
                allowFullScreen
                loading="lazy"
                title="video"
              />
            </Box>
          </AspectRatio>
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
  const data = await fetchVideos(page);
  return {
    data,
    page,
  };
}
