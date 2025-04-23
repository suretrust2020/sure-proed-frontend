import { LinkedinIcon } from "@/lib/icons";
import type { BoardMember } from "@/lib/types";
import { Avatar, Button, Card } from "@chakra-ui/react";

export function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <Card.Root size={"sm"}>
      <Card.Body>
        <Avatar.Root mb={4} size={"2xl"}>
          <Avatar.Image src={member.image} />
          <Avatar.Fallback name={member.name} />
        </Avatar.Root>

        <Card.Title>{member.name}</Card.Title>
        <Card.Description lineClamp={5}>{member.about}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button asChild variant="outline" size={"sm"}>
          <a href={member.linked_in_url}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
