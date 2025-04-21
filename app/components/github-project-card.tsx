import { getLanguageColor } from "@/lib/utils";
import type { T_GithubRepo } from "@/repositories/github";
import { Avatar, Box, Card, Stack, Text } from "@chakra-ui/react";

interface GithubProjectCardProps extends T_GithubRepo {}

export function GithubProjectCard({
  title,
  repo_link,
  description,
  author,
  language,
}: GithubProjectCardProps) {
  return (
    <a target="_blank" href={repo_link}>
      <Card.Root
        variant={"outline"}
        rounded="md"
        transition="all 0.2s"
        _hover={{ shadow: "sm" }}
        size={"sm"}
      >
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Stack gap={3}>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={"GrayText"}
              lineClamp={2}
              lineHeight="1.5"
            >
              {description}
            </Text>

            <Stack gap={2}>
              <Stack direction="row" align="center" gap={4}>
                <Stack direction="row" align="center" gap={2}>
                  <Avatar.Root size="xs">
                    <Avatar.Fallback name={author} />
                  </Avatar.Root>
                  <Text fontSize="sm" color="fg.muted">
                    {author}
                  </Text>
                </Stack>
                <Stack direction="row" align="center" gap={1}>
                  <Box
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={getLanguageColor(language)}
                  />
                  <Text fontSize="sm" color={"fg.muted"}>
                    {language}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </a>
  );
}
