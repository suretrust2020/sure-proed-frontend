import { Badge, Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserType } from "./types";

export function UserCard({ bio, category, imageUrl, name }: UserType) {
  return (
    <Card.Root variant={"outline"}>
      <Card.Body gap="2">
        <Avatar src={imageUrl} name={name} w={32} h={32} shape="full" />
        <Card.Title mt="2">{name}</Card.Title>
        <Badge
          colorPalette={"purple"}
          variant={"surface"}
          size={"md"}
          w="fit-content"
        >
          {category}
        </Badge>
        <Card.Description lineHeight={1.8} mt={2}>
          {bio}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
