import {
  SimpleGrid,
  HStack,
  Badge,
  Container,
  Card,
  Button,
  Heading,
} from "@chakra-ui/react";
import {
  Briefcase,
  Building,
  Calendar1Icon,
  ExternalLinkIcon,
  PlusIcon,
} from "lucide-react";
import type { Route } from "./+types/page";
import { getSuccessStories } from "@/repositories/success-story";
import { Link } from "react-router";
import { BatchIcon, CourseIcon } from "@/lib/icons";
import { RoleFilters } from "./role-filters";

export default function SuccessStoryList({
  loaderData: { successStories },
}: Route.ComponentProps) {
  return (
    <Container>
      <HStack justify={"space-between"} gap={4} mb={8}>
        <Heading>Success Stories</Heading>
        <HStack>
          <RoleFilters />
          <Button size={"sm"} variant={"subtle"} asChild>
            <Link to={"/success-stories/create"}>
              <PlusIcon />
              Create
            </Link>
          </Button>
        </HStack>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {successStories.items.map((story) => (
          <Card.Root variant={"outline"} size={"sm"}>
            <Card.Body>
              <Card.Title>
                <HStack>
                  {story.name}

                  <Badge
                    size={"sm"}
                    colorPalette={"purple"}
                    textTransform={"uppercase"}
                  >
                    {story.role}
                  </Badge>
                </HStack>
              </Card.Title>

              <Card.Description my={3} lineClamp={2}>
                {story.content}
              </Card.Description>
              <HStack align="center" gap={2} wrap={"wrap"}>
                {story.course && (
                  <Badge colorPalette={"purple"}>
                    <CourseIcon size={14} />
                    {story.course}
                  </Badge>
                )}
                {story.designation && (
                  <Badge>
                    <Briefcase size={14} />
                    {story.designation}
                  </Badge>
                )}
                {story.company && (
                  <Badge>
                    <Building size={14} />
                    {story.company}
                  </Badge>
                )}

                {story.batch && (
                  <Badge>
                    <BatchIcon size={14} />
                    G-{story.batch}
                  </Badge>
                )}

                <Badge>
                  <Calendar1Icon size={14} />
                  {new Date(story.createdAt).toLocaleDateString()}
                </Badge>
              </HStack>
            </Card.Body>
            <Card.Footer>
              <Button
                colorPalette={"purple"}
                w="fit-content"
                asChild
                variant="outline"
                size={"xs"}
              >
                <Link to={`/success-stories/${story._id}`}>
                  View
                  <ExternalLinkIcon />
                </Link>
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const roles = searchParams.get("roles")?.split(",") || [];
  const successStories = await getSuccessStories({ roles, status: "approved" });
  return {
    successStories,
  };
}
