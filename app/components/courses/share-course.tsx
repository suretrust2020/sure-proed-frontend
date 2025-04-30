import { useShare } from "@/hooks/use-share";
import type { CourseListType } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import { ShareIcon } from "lucide-react";

export function ShareCourse({ course }: { course: CourseListType }) {
  const share = useShare();

  async function handleShare() {
    const url = `${window.location.origin}/courses/${course.id}`;

    const shareInput = {
      title: `Enroll in ${course.course_name}`,
      text: `Prerequisites: ${course.prerequisites}`,
      url,
    };
    share(shareInput);
  }

  return (
    <Button onClick={handleShare} variant={"outline"} size={"sm"}>
      <ShareIcon />
      Share
    </Button>
  );
}
