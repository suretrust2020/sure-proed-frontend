import { Button, Container, For, Heading, SimpleGrid } from "@chakra-ui/react";
import { DocsIcon, PhotoIcon, VideoIcon } from "@/lib/icons";
import { Link } from "react-router";
export default function GalleryPage() {
  const services = [
    {
      name: "Photos",
      slug: "photos",
      icon: PhotoIcon,
    },
    {
      name: "Videos",
      slug: "videos",
      icon: VideoIcon,
    },
    {
      name: "Documents",
      slug: "documents",
      icon: DocsIcon,
    },
  ];
  return (
    <Container maxW={"7xl"} py={12}>
      <Heading textAlign={"center"} fontSize={"2xl"} mb={12}>
        Gallery
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
        <For each={services}>
          {({ icon: Icon, name, slug }) => (
            <Button key={name} asChild size={"2xl"} variant={"subtle"}>
              <Link to={`/gallery/${slug}`}>
                <Icon size={24} />
                {name}
              </Link>
            </Button>
          )}
        </For>
      </SimpleGrid>
    </Container>
  );
}
