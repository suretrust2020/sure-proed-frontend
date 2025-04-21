import { Badge, Box, Card, HStack, IconButton, Image } from "@chakra-ui/react";
import PhotosCarousel from "@/components/photos-carousel";
import type { PlantationType } from "@/lib/types";
import { ImageAltIcon } from "@/lib/icons";

export function UserCard({ plantation }: { plantation: PlantationType }) {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box pos={"relative"}>
        <Image
          alt={plantation.user}
          src={plantation.images[0].url}
          width={400}
          height={400}
        />

        {plantation.images.length >= 2 && (
          <PhotosCarousel
            title={plantation.slug}
            images={plantation.images.map((i) => i.url)}
          >
            <IconButton
              pos={"absolute"}
              right={4}
              bottom={4}
              size={"md"}
              rounded={"full"}
              variant={"solid"}
            >
              <ImageAltIcon />
            </IconButton>
          </PhotosCarousel>
        )}
      </Box>

      <Card.Body gap="2">
        <Card.Title>{plantation.user}</Card.Title>
        <Card.Description>{plantation.slug}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <HStack w="full" justify={"space-between"}>
          <HStack gap={4}>
            <Badge>Plants: {plantation.plants}</Badge>
            <Badge>Images: {plantation.images.length}</Badge>
          </HStack>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
}
