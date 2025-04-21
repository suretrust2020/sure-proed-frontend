import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import type { CourseListType } from "@/lib/types";
import {
  Button,
  Card,
  createListCollection,
  Field,
  Portal,
  Select,
} from "@chakra-ui/react";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "../schema";
import type { z } from "zod";
import { useSignup } from "../signup-provider";

const courseSchema = signupSchema.pick({
  course_id: true,
});

type CourseSchema = z.infer<typeof courseSchema>;

export function CourseDetails({
  onPrev,
  onNext,
  coursePromise,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  coursePromise?: Promise<CourseListType[]>;
}) {
  const { formData, updateFormData } = useSignup();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      ...formData,
    },
  });

  const courses = use(coursePromise ?? Promise.resolve([]));
  const collection = createListCollection({
    items: courses.map((course) => ({
      label: course.course_name,
      value: String(course.id),
    })),
  });

  function onSubmit(data: any) {
    updateFormData(data);
    onNext?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Course Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Field.Root invalid={!!errors.course_id}>
            <Field.Label>Select Course</Field.Label>
            <Controller
              control={control}
              name="course_id"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={collection}
                  colorPalette={"purple"}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select course" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {collection.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.course_id?.message}</Field.ErrorText>
          </Field.Root>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            variant="outline"
            type="button"
            colorPalette={"purple"}
            size={"sm"}
            onClick={onPrev}
          >
            <ArrowLeftIcon /> Prev
          </Button>
          <Button
            variant="outline"
            type="submit"
            colorPalette={"purple"}
            size={"sm"}
          >
            Next <ArrowRightIcon />
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}
