import { Card } from "@chakra-ui/react";
import { Link } from "react-router";

export function CourseCard({ link, name }: { link: string; name: string }) {
  return (
    <Link to={link}>
      <Card.Root
        px={4}
        py={1}
        size="sm"
        _hover={{
          transform: "scale(1.03)",
          transitionDuration: "0.3s",
        }}
      >
        <Card.Body color="fg.muted">
          <Card.Title fontSize={"sm"} textAlign={"center"} lineClamp={2}>
            {name}
          </Card.Title>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
