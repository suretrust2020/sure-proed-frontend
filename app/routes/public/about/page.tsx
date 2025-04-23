import {
  Box,
  Card,
  Container,
  Heading,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fetchBoardMembers } from "@/lib/services";
import type { Route } from "./+types/page";
import { BoardMembers } from "./board-members";
import { NARRATION_CONTENT, NARRATION_TITLE } from "@/lib/data";

export default function AboutPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Container>
        <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
          Birth Of The SURE Trust
        </Heading>
        <Card.Root maxW={"5xl"} mx="auto" mt={6}>
          <Image
            src="https://www.suretrustforruralyouth.com/assets/satya_sai_baba-cf39ec6f.jpg"
            alt="Satya Sai Baba Poster"
            objectFit="cover"
            w="full"
            maxH="400px"
          />

          <Card.Body>
            <Heading
              mb={4}
              color={"gray.solid"}
              textAlign="center"
              fontSize={"xl"}
            >
              {loaderData.narration.title}
            </Heading>
            <Card.Description
              fontSize={"md"}
              lineHeight="1.9"
              wordSpacing="wider"
              textAlign="justify"
            >
              {loaderData.narration.content}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </Container>
      <Separator mt={4} />
      <Box bg={"bg.muted"}>
        <Container pt={6}>
          <VStack gap={12}>
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
      </Box>
    </Box>
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
