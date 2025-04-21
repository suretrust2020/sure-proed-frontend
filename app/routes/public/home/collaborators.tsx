import { Button, Flex } from "@chakra-ui/react";
import type { Collaborator } from "@/lib/types";

export function Collaborators({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  return (
    <Flex justifyContent={"center"} wrap={"wrap"} gap={4}>
      {collaborators.map(({ link, name, id }) => (
        <Button
          key={id}
          size={"xl"}
          variant={"outline"}
          _hover={{ bg: "purple.500", color: "white" }}
        >
          <a href={link} target="_blank">
            {name}
          </a>
        </Button>
      ))}
    </Flex>
  );
}
