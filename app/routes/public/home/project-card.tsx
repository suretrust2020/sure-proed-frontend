"use client";
import { Button, Card, Image } from "@chakra-ui/react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const { project_name, poster_url, domain_name, github_url } = project;
  return (
    <Card.Root w="full" h={"full"}>
      <Image
        src={poster_url ?? "/default-project.webp"}
        alt={project_name}
        aspectRatio={"auto"}
        h={"64"}
      />
      <Card.Body gap="2">
        <Card.Title lineClamp={1}>{domain_name}</Card.Title>
        <Card.Description lineClamp={2}>{project_name}</Card.Description>
      </Card.Body>
      <Card.Footer>
        {github_url && (
          <Button variant="subtle" asChild>
            <a href={github_url} target="_blank">
              Github
            </a>
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
}
