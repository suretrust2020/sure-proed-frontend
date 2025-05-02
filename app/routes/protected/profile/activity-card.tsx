import { Card, Heading, HStack, Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ActivityCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ActivityCard({ title, icon, children }: ActivityCardProps) {
  return (
    <Card.Root
      borderColor="purple.200"
      shadow="sm"
      _hover={{ shadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <Card.Header
        pb={2}
        bg="purple.50"
        borderBottomWidth="1px"
        borderBottomColor="purple.100"
      >
        <HStack gap={2}>
          <Box color="purple.600">{icon}</Box>
          <Heading size="md" fontWeight="semibold" color="purple.800">
            {title}
          </Heading>
        </HStack>
      </Card.Header>
      <Card.Body pt={4}>{children}</Card.Body>
    </Card.Root>
  );
}
