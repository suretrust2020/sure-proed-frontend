import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { UsersIcon } from "@/lib/icons";
import { Badge, Box, Card, For, HStack, Strong } from "@chakra-ui/react";
import { Link } from "react-router";

export function CourseCard({
  course,
  href,
  serviceIcon,
}: {
  course: { course_name: string; count: number; users?: string[] };
  href: string;
  serviceIcon: React.ReactNode;
}) {
  return (
    <Link to={href}>
      <Card.Root h={"full"} size="sm" _hover={{ bg: "bg.muted" }}>
        <Card.Body>
          <Strong lineClamp={2}>{course.course_name}</Strong>
          <HStack mt={3}>
            <Badge size={"lg"} variant={"outline"}>
              {serviceIcon}
              <Box as="span">{course.count}</Box>
            </Badge>
            {course.users && (
              <Badge size={"lg"} variant={"outline"}>
                <UsersIcon />
                <Box as="span">{course.users.length}</Box>
              </Badge>
            )}
          </HStack>
          {course.users && (
            <AvatarGroup size={"xs"} mt={4}>
              <For each={course.users.slice(0, 10)}>
                {(user, i) => <Avatar key={i} title={user} name={user} />}
              </For>

              {course.users.length > 10 && (
                <Avatar
                  variant="solid"
                  fallback={"+" + (course.users.length - 10)}
                />
              )}
            </AvatarGroup>
          )}
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
