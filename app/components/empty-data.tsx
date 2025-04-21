import { DatabaseDash } from "@/lib/icons";
import { EmptyState, VStack } from "@chakra-ui/react";

export function EmptyData({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <EmptyState.Root size={"md"} bg={"bg.muted"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <DatabaseDash />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
