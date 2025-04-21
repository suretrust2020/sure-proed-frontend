import { Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import type { CourseTeacher } from "@/lib/types";

export function TeacherCard({ teacher }: { teacher: CourseTeacher }) {
  return (
    <Card.Root>
      <Card.Body gap="2">
        {teacher.profile_pic && (
          <Avatar
            src={teacher.profile_pic}
            name={teacher.name}
            size="2xl"
            shape="full"
          />
        )}
        <Card.Title mt="2">{teacher.name}</Card.Title>
        <Card.Description>{teacher.qualification}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
