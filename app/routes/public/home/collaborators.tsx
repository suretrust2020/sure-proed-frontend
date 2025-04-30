import type { Collaborator } from "@/lib/types";
import { Card, Flex, For } from "@chakra-ui/react";

export function Collaborators({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  return (
    <Flex gap={4} justify={"center"} flexWrap={"wrap"}>
      <For each={collaborators}>
        {(collaborator) => <CollaboratorCard collaborator={collaborator} />}
      </For>
    </Flex>
  );
}

function CollaboratorCard({ collaborator }: { collaborator: any }) {
  return (
    <a target="_blank" href={collaborator.link}>
      <Card.Root
        w="fit-content"
        size="sm"
        variant="elevated"
        _hover={{ bg: "bg.muted" }}
        transition={"all 0.4s "}
      >
        <Card.Body>{collaborator.name}</Card.Body>
      </Card.Root>
    </a>
  );
}
