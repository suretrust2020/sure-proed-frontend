import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/providers/auth-store-provider";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFetcher } from "react-router";

export function EnrollCourse({ courseId }: { courseId: number }) {
  const user = useAuthStore((state) => state.user);
  let fetcher = useFetcher();
  let busy = fetcher.state === "submitting";

  useEffect(() => {
    async function renderToast() {
      if (fetcher.data) {
        Promise.resolve().then(() => {
          toaster.create({
            type: fetcher.data.success ? "success" : "error",
            description: fetcher.data.message,
          });
        });
      }
    }

    renderToast();
  }, [fetcher.data]);

  if (!user) return null;
  return (
    <fetcher.Form method="POST">
      <input type="hidden" name="courseId" value={courseId} />
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
