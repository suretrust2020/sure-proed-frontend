import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "react-router";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  Stack,
  NumberInput,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectCourse } from "@/components/select-course";
import type { CourseListType } from "@/lib/types";
import { ImageUpload } from "@/components/image-upload";
import { toaster } from "@/components/ui/toaster";

const plantationSchema = z.object({
  batch: z.string().optional(),
  course: z.string().optional(),
  user: z.string().min(1, "User is required"),
  plants: z.string().min(1, "Total plants is required"),
});

type ProjectFormValues = z.infer<typeof plantationSchema>;

export function PlantationForm({ courses }: { courses: CourseListType[] }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(plantationSchema),
    defaultValues: {},
  });

  const onSubmit = (values: ProjectFormValues) => {
    fetcher.submit(
      { ...values, images: JSON.stringify(images) },
      { method: "POST" }
    );
    reset();
  };

  useEffect(() => {
    if (fetcher.data) {
      toaster.create({
        closable: true,
        description: fetcher.data.message,
        title: "Plantation",
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
              <Dialog.Title>Add Plantation</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={4}>
                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>Course</Field.Label>
                    <SelectCourse courses={courses} />
                  </Field.Root>
                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>Batch</Field.Label>
                    <Input {...register("batch")} />
                  </Field.Root>

                  <Field.Root colorPalette={"purple"}>
                    <Field.Label>User</Field.Label>
                    <Input {...register("user")} />
                  </Field.Root>

                  <NumberInput.Root
                    defaultValue="1"
                    colorPalette={"purple"}
                    min={1}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input {...register("plants")} />
                  </NumberInput.Root>

                  <ImageUpload onUpload={(images) => setImages(images)} />

                  <Button type="submit" colorPalette="purple" loading={busy}>
                    <PlusIcon />
                    Submit
                  </Button>
                </Stack>
              </form>
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
