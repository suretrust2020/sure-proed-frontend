import { toaster } from "@/components/ui/toaster";
import type { CourseListType } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import { ShareIcon } from "lucide-react";

export function ShareCourse({ course }: { course: CourseListType }) {
  const handleShare = async () => {
    const url = `${window.location.origin}/courses/${course.id}`;
    const shareData = {
      title: course.course_name,
      text: `Enroll in ${course.course_name}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toaster.create({
          description: "Copied to clipboard!",
          type: "success",
          closable: true,
        });
      } else {
        toaster.create({
          description: "Sharing not supported on this device.",
          type: "error",
          closable: true,
        });
      }
    } catch (err: any) {
      console.error("Share failed:", err);
      toaster.create({
        description: err.message,
        type: "info",
        closable: true,
      });
    }
  };

  return (
    <Button onClick={handleShare} variant={"outline"} size={"sm"}>
      <ShareIcon />
      Share
    </Button>
  );
}
