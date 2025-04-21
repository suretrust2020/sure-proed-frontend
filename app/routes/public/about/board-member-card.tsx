import { LinkedinIcon } from "@/lib/icons";
import type { BoardMember } from "@/lib/types";
import { Button, Card, Image } from "@chakra-ui/react";

export function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        w={"full"}
        maxH={"80"}
        aspectRatio={"square"}
        src={member.image}
        alt={member.name}
      />
      <Card.Body gap="2">
        <Card.Title>{member.name}</Card.Title>
        <Card.Description lineClamp={5}>{member.about}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button asChild variant="subtle">
          <a href={member.linked_in_url}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
