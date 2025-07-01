import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stat,
  Text,
  VStack,
  Badge,
  Separator,
} from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { getSuccessStory } from "@/repositories/success-story";
import { data } from "react-router";

export default function SuccessStoryDetails({
  loaderData,
}: Route.ComponentProps) {
  const { successStory } = loaderData;

  return (
    <Container maxW="2xl">
      {/* Header */}
      <VStack align="start" gap={1}>
        <HStack wrap={"wrap"}>
          <Heading size="lg">{successStory.name}</Heading>
          <Badge colorPalette={"purple"} textTransform={"uppercase"}>
            {successStory.role}
          </Badge>
        </HStack>

        {successStory.linkedin && (
          <Link
            href={successStory.linkedin}
            target="_blank"
            fontSize="sm"
            mt={1}
          >
            View LinkedIn Profile ↗
          </Link>
        )}
      </VStack>

      <Box my={6} />

      {/* Info Section */}
      <VStack align="start" gap={4}>
        {successStory.course && (
          <Info label="Course" value={successStory.course} />
        )}
        {successStory.batch && (
          <Info label="Batch" value={`Batch ${successStory.batch}`} />
        )}
        {successStory.trainer && (
          <Info label="Trainer" value={successStory.trainer} />
        )}
        {successStory.employed && (
          <>
            {successStory.company && (
              <Info label="Company" value={successStory.company} />
            )}
            {successStory.designation && (
              <Info label="Designation" value={successStory.designation} />
            )}
          </>
        )}
      </VStack>
      <Separator my={6} />

      {/* Story Content */}
      <Box>
        <Heading size="md" mb={2}>
          Journey
        </Heading>
        <Text fontSize="md" whiteSpace="pre-line" lineHeight="taller">
          {successStory.content}
        </Text>
      </Box>

      <Separator my={6} />

      {/* Meta Info */}
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
        <Stat.Root>
          <Stat.Label fontSize="xs">Submitted</Stat.Label>
          <Stat.ValueText fontSize="sm">
            {new Date(successStory.createdAt).toDateString()}
          </Stat.ValueText>
        </Stat.Root>

        <Stat.Root>
          <Stat.Label fontSize="xs">Last Updated</Stat.Label>
          <Stat.ValueText fontSize="sm">
            {new Date(successStory.updatedAt).toDateString()}
          </Stat.ValueText>
        </Stat.Root>
      </SimpleGrid>
    </Container>
  );
}

/* Reusable Info Row */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <HStack gap={1}>
      <Text fontSize="sm" fontWeight="medium" minW="100px">
        {label}:
      </Text>
      <Text fontSize="sm">{value}</Text>
    </HStack>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const successStory = await getSuccessStory(params.id);
  if (!successStory) {
    throw data("Success story not found", { status: 404 });
  }
  return {
    successStory,
  };
}
