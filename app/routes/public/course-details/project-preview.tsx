"use client";

import type { GithubRepoType } from "@/lib/types";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Link,
  Stack,
  Icon,
  Card,
} from "@chakra-ui/react";
import { Star, GitBranch, Eye } from "lucide-react";

type ProjectPreviewProps = {
  data: GithubRepoType;
};

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  if (!data) return null;

  return (
    <Card.Root size={"sm"}>
      <Card.Body>
        <Flex align="center" mb={4}>
          <Avatar.Root size="sm" mr={4}>
            <Avatar.Fallback name={data.owner.login} />
            <Avatar.Image src={data.owner.avatar_url} />
          </Avatar.Root>
          <Box>
            <Link
              target="_blank"
              href={data.html_url}
              fontWeight="semibold"
              fontSize="md"
            >
              {data.name}
            </Link>
          </Box>
        </Flex>

        {data.description && (
          <Text fontSize="sm" mb={4} color="chakra-text">
            {data.description}
          </Text>
        )}

        <Stack direction="row" gap={4} mt={4} align="center" wrap="wrap">
          {data.language && (
            <Badge colorPalette="purple">{data.language}</Badge>
          )}

          <Flex align="center" gap={1}>
            <Icon as={Star} boxSize={4} />
            <Text fontSize="sm">{data.stargazers_count}</Text>
          </Flex>

          <Flex align="center" gap={1}>
            <Icon as={GitBranch} boxSize={4} />
            <Text fontSize="sm">{data.forks_count}</Text>
          </Flex>

          <Flex align="center" gap={1}>
            <Icon as={Eye} boxSize={4} />
            <Text fontSize="sm">{data.watchers_count}</Text>
          </Flex>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
