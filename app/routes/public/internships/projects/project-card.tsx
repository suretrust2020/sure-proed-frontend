import { Badge, Button, Card, Image, Tag } from "@chakra-ui/react";
import type { InternshipProjectType } from "@/lib/types";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { GithubIcon } from "@/lib/icons";
export function ProjectCard({
  project_name,
  github_url,
  description,
  poster_url,
  STUDENTS,
  domain_name,
}: InternshipProjectType & { domain_name: string }) {
  return (
    <Card.Root overflow={"hidden"}>
      {poster_url && (
        <Image src={poster_url} alt={project_name} aspectRatio={"landscape"} />
      )}
      <Card.Body gap="2">
        <Badge width={"fit-content"} colorPalette="purple">
          {domain_name}
        </Badge>
        <Card.Title lineClamp={2}>{project_name}</Card.Title>

        <Card.Description lineClamp={3}>{description}</Card.Description>
        <AvatarGroup colorPalette={"purple"} gap="0" spaceX="-3" size="xs">
          {STUDENTS.map((student, i) => (
            <Avatar.Root key={i}>
              <Avatar.Fallback name={student.name.slice(3)} />
              <Avatar.Image src={student.image_url} />
            </Avatar.Root>
          ))}
        </AvatarGroup>
      </Card.Body>
      <Card.Footer>
        {github_url && (
          <Button asChild variant={"surface"}>
            <a href={github_url} target="_blank">
              <GithubIcon />
              Github
            </a>
          </Button>
        )}
        <Button colorPalette={"purple"}>Details</Button>
      </Card.Footer>
    </Card.Root>
  );
}
