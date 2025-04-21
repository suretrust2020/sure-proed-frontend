import type { BoardMember } from "@/lib/types";
import { Box, For, Heading, SimpleGrid } from "@chakra-ui/react";
import { BoardMemberCard } from "./board-member-card";

type BoardMembersProps = {
  title: string;
  boardMembers: BoardMember[];
};
export function BoardMembers({ title, boardMembers }: BoardMembersProps) {
  return (
    <Box>
      <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
        {title}
      </Heading>

      <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        <For each={boardMembers}>
          {(member) => <BoardMemberCard key={member.id} member={member} />}
        </For>
      </SimpleGrid>
    </Box>
  );
}
