import { Pagination } from "@/components/shared/pagination";
import {
  AspectRatio,
  Container,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { fetchPictures } from "@/repositories/gallery";

export default function PhotosGallery({ loaderData }: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} mx={"auto"} py={12}>
      <Heading fontSize={"2xl"} mb={6}>
        Picture Gallery
      </Heading>
      <SimpleGrid gap={4} columns={[1, 1, 2, 3]}>
        {loaderData.data.results.map(({ id, image_name, images }) => (
          <a href={images} target="_blank">
            <AspectRatio ratio={1} key={id} borderWidth={"8px"}>
              <Image src={images} alt={image_name} width={400} height={400} />
            </AspectRatio>
          </a>
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
  const data = await fetchPictures(page);
  return {
    data,
    page,
  };
}
