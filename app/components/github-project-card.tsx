import type { ProjectType } from "@/lib/mongodb/models/projects";
import { Box, Flex, Avatar, Text, Badge, Stack, Card } from "@chakra-ui/react";

export const ProjectCard = ({
  author,
  description,
  language,
  link,
  name,
  authorAvatar,
}: ProjectType) => {
  return (
    <a href={link} target="_blank" style={{ display: "block", width: "100%" }}>
      <Card.Root size={"sm"} h="full">
        <Card.Body>
          <Flex align="center" mb={4}>
            <Avatar.Root size="md" mr={4}>
              <Avatar.Fallback name={author} />
              <Avatar.Image src={authorAvatar} />
            </Avatar.Root>
            <Box>
              <Text fontWeight="semibold" fontSize="md">
                {name}
              </Text>
              <Text fontSize="sm">{author}</Text>
            </Box>
          </Flex>

          {description && (
            <Text lineClamp={2} fontSize="sm" mb={4} color="chakra-text">
              {description}
            </Text>
          )}

          <Stack direction="row" gap={4} mt={4} align="center" wrap="wrap">
            {language && <Badge colorPalette="purple">{language}</Badge>}
            <Badge variant={"outline"}>Public</Badge>
          </Stack>
        </Card.Body>
      </Card.Root>
    </a>
  );
};
