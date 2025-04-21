import { Badge, Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { DeveloperType } from "@/lib/types";

export function DeveloperCard({
  image,
  education,
  name,
  position,
  links,
}: DeveloperType) {
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Avatar src={image} name={name} size="2xl" shape="rounded" />
        <Card.Title mt="2">{name}</Card.Title>
        <Badge variant={"outline"} size={"md"} w="fit-content">
          {position}
        </Badge>
        <Card.Description mt={2}>{education}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        {links.map((link) => (
          <Button size={"sm"} asChild key={link.name} variant="outline">
            <a target="_blank" href={link.url}>
              {link.name}
            </a>
          </Button>
        ))}
      </Card.Footer>
    </Card.Root>
  );
}
