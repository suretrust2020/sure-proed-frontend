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
        {(collaborator) => (
          <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
        )}
      </For>
    </Flex>
  );
}

function CollaboratorCard({ collaborator }: { collaborator: any }) {
  return (
    <a target="_blank" href={collaborator.link}>
      <Card.Root
        w="full"
        size="sm"
        variant="elevated"
        _hover={{ bg: "bg.muted" }}
        transition={"all 0.4s "}
        px={8}
      >
        <Card.Body>{collaborator.name}</Card.Body>
      </Card.Root>
    </a>
  );
}
