import { Avatar, Card, HStack, Stack, Text } from "@chakra-ui/react";
import type { UserType } from "./types";

export function UserCard({ bio, category, imageUrl, name }: UserType) {
  return (
    <Card.Root size={"sm"}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root>
            <Avatar.Image src={imageUrl} />
            <Avatar.Fallback name={name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {category}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{bio}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
