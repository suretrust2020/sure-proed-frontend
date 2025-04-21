import { Tag } from "@/components/ui/tag";
import { Box, Card, HStack, Image, Text } from "@chakra-ui/react";

export type User = {
  role: string;
  name: string;
  imageUrl: string;
  courseName: string;
};
export function UserCard({ courseName, imageUrl, name, role }: User) {
  return (
    <Card.Root maxW="sm" overflow="hidden" size={"sm"}>
      <Box pos={"relative"}>
        <Image
          loading="lazy"
          alt={name}
          src={imageUrl}
          width={400}
          height={400}
        />
      </Box>
      <Card.Header>
        <Card.Title fontSize={"18"}>{name}</Card.Title>
      </Card.Header>

      <Card.Body gap="2">
        <Card.Description>{courseName}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Tag>{role}</Tag>
      </Card.Footer>
    </Card.Root>
  );
}
