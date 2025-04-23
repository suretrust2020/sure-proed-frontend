import { Avatar, Button, Card, HStack, Stack, Text } from "@chakra-ui/react";
import type { DeveloperType } from "@/lib/types";
import { LinkedinIcon } from "@/lib/icons";

export function DeveloperCard({
  image,
  education,
  name,
  position,
  links,
}: DeveloperType) {
  return (
    <Card.Root size={"sm"}>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root size={"xl"}>
            <Avatar.Image src={image} />
            <Avatar.Fallback name={name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {position}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{education}</Card.Description>
      </Card.Body>
      <Card.Footer>
        {links.map((link) => (
          <Button size={"xs"} asChild key={link.name} variant="outline">
            <a target="_blank" href={link.url}>
              <LinkedinIcon />
              {link.name}
            </a>
          </Button>
        ))}
      </Card.Footer>
    </Card.Root>
  );
}
