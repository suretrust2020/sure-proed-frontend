import { Button } from "@/components/ui/button";
import { ShareIcon } from "@/lib/icons";
import type { CourseListType } from "@/lib/types";
import { Card } from "@chakra-ui/react";
import { Link } from "react-router";
import { ShareCourse } from "./share-course";

export function CourseCard({ course }: { course: CourseListType }) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>{course.course_name}</Card.Title>
        <Card.Description>{course.prerequisites}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button asChild size={"sm"} colorPalette={"purple"}>
          <Link to={`/courses/${course.id}`}>View</Link>
        </Button>
        <ShareCourse course={course} />
      </Card.Footer>
    </Card.Root>
  );
}
