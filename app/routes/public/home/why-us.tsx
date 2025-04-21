import { Card, SimpleGrid } from "@chakra-ui/react";
import type { Feature } from "@/lib/types";

export function WhyUs({ features }: { features: Feature[] }) {
  return (
    <SimpleGrid columns={[1, 1, 2]} gap={4}>
      {features.map(({ title, description, id }) => (
        <Card.Root key={id}>
          <Card.Body gap="2">
            <Card.Title>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}
