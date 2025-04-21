import { Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { fetchBoardMembers } from "@/lib/services";
import type { Route } from "./+types/page";
import { BoardMembers } from "./board-members";
import { NARRATION_CONTENT, NARRATION_TITLE } from "@/lib/data";

export default function AboutPage({ loaderData }: Route.ComponentProps) {
  return (
    <Container maxW={"7xl"} py={8}>
      <VStack gap={16}>
        <VStack gap={8}>
          <Heading textAlign={"center"} fontSize={"3xl"} mb={4}>
            Birth Of The SURE Trust
          </Heading>
          <Image
            width={"full"}
            maxH={"600px"}
            src="https://www.suretrustforruralyouth.com/assets/satya_sai_baba-cf39ec6f.jpg"
          />
          <Heading textAlign={"center"} fontSize={"2xl"}>
            {loaderData.narration.title}
          </Heading>
          <Text wordSpacing={4} lineHeight={1.8}>
            {loaderData.narration.content}
          </Text>
        </VStack>
        <BoardMembers
          title="Board Of Trustees"
          boardMembers={loaderData.board.board_of_trustees}
        />
        <BoardMembers
          title="Board Of Advisors"
          boardMembers={loaderData.board.board_of_advisers}
        />
      </VStack>
    </Container>
  );
}

export async function loader() {
  const boardResp = await fetchBoardMembers();
  const narration = {
    title: NARRATION_TITLE,
    content: NARRATION_CONTENT,
  };
  return {
    board: boardResp,
    narration,
  };
}
