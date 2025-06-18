import { Tooltip } from "@/components/ui/tooltip";
import { Box, Container, Heading, HStack, IconButton } from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export default function SuccessStoryPage() {
  return (
    <Box>
      <Container>
        <HStack>
          <Tooltip content="Create success story">
            <IconButton
              size={"sm"}
              asChild
              variant={"solid"}
              colorPalette={"purple"}
            >
              <Link to={"create"}>
                <PlusIcon />
              </Link>
            </IconButton>
          </Tooltip>
        </HStack>
      </Container>
    </Box>
  );
}
