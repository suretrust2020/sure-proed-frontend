import { Card, Image } from "@chakra-ui/react";
import { Link } from "react-router";

type AlumniCardProps = {
  poster: string;
  title: string;
  description: string;
  href: string;
};
export function AlumniCard({
  poster,
  title,
  description,
  href,
}: AlumniCardProps) {
  return (
    <Link to={`/alumni/${href}`}>
      <Card.Root _hover={{ shadow: "sm" }} transitionDuration={"moderate"}>
        <Image
          src={poster}
          width={"100%"}
          height={40}
          aspectRatio={"landscape"}
          overflow={"hidden"}
          roundedTop={"md"}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
