import { useFetcher } from "react-router";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectCourse } from "@/components/select-course";
import type { CourseListType } from "@/lib/types";
import { ImageUpload } from "@/components/image-upload";
import { toaster } from "@/components/ui/toaster";
import { SelectUserRoles } from "../select-user-roles";

export function SeniorCitizenForm({ courses }: { courses: CourseListType[] }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data) {
      toaster.create({
        closable: true,
        description: fetcher.data.message,
        title: "Blood donation",
        type: fetcher.data.success ? "success" : "error",
      });

      if (fetcher.data.success) {
        setOpen(false);
      }
    }
  }, [fetcher.data]);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger>
        <Button variant="outline" size="sm">
          <PlusIcon />
          Add Data
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Senior citizen</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <fetcher.Form
                method="post"
                onSubmit={() => {
                  setOpen(false);
                }}
              >
                <input
                  type="hidden"
                  name="images"
                  value={images?.length ? JSON.stringify(images) : ""}
                />
                <Stack gap={4}>
                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>Course</Field.Label>
                    <SelectCourse courses={courses} />
                  </Field.Root>
                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>Batch</Field.Label>
                    <Input name="batch" />
                  </Field.Root>

                  <Field.Root colorPalette={"purple"} required>
                    <Field.Label>User</Field.Label>
                    <Input name="user" />
                  </Field.Root>
                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>Role</Field.Label>
                    <SelectUserRoles />
                  </Field.Root>
                  <ImageUpload
                    limit={1}
                    onUpload={(images) => setImages(images)}
                  />

                  <Button type="submit" colorPalette="purple" loading={busy}>
                    <PlusIcon />
                    Submit
                  </Button>
                </Stack>
              </fetcher.Form>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
