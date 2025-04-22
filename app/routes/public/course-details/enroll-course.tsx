import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/providers/auth-store-provider";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFetcher } from "react-router";

export function EnrollCourse({ courseId }: { courseId: number }) {
  const user = useAuthStore((state) => state.user);
  let fetcher = useFetcher();
  let busy =
    fetcher.formData?.get("intent") === "enroll" &&
    fetcher.state === "submitting";

  useEffect(() => {
    async function renderToast() {
      if (fetcher?.data?.enroll) {
        Promise.resolve().then(() => {
          toaster.create({
            type: fetcher.data.enroll.success ? "success" : "error",
            description: fetcher.data.enroll.message,
          });
        });
      }
    }

    renderToast();
  }, [fetcher?.data?.enroll]);

  if (!user) return null;
  return (
    <fetcher.Form method="POST">
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="intent" value={"enroll"} />
      <Button
        type="submit"
        size={"sm"}
        variant={"solid"}
        colorPalette={"purple"}
        loading={busy}
      >
        Enroll Now
      </Button>
    </fetcher.Form>
  );
}
