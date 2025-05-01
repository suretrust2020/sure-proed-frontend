import type { ProjectType } from "@/lib/mongodb/models/projects";
import type { Course } from "@/lib/types";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Stack,
  Card,
  HStack,
} from "@chakra-ui/react";
import { BookIcon } from "lucide-react";

export const ProjectCard = ({
  author,
  description,
  language,
  link,
  name,
  authorAvatar,
  course,
}: ProjectType & { course: Course }) => {
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
              <Text lineClamp={1} fontWeight="semibold" fontSize="md">
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

          <Box mb={2}>
            <HStack>
              <BookIcon size={"16"} />
              <Text fontSize="xs" fontWeight={"medium"} lineClamp={1}>
                {course.course_name}
              </Text>
            </HStack>
          </Box>

          <Stack direction="row" gap={4} mt={4} align="center" wrap="wrap">
            {language && <Badge colorPalette="purple">{language}</Badge>}
            <Badge variant={"outline"}>Public</Badge>
          </Stack>
        </Card.Body>
      </Card.Root>
    </a>
  );
};
