import type { CourseListType } from "@/lib/types";
import { createListCollection, Field, Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export function SelectCourse({
  courses,
  error,
  control,
}: {
  courses: CourseListType[];
  error?: string;
  control?: any;
}) {
  const collection = createListCollection({
    items: courses.map((course) => ({
      label: course.course_name,
      value: String(course.id),
    })),
  });

  return (
    <Field.Root invalid={!!error}>
      <Field.Label>Choose Course</Field.Label>
      <Controller
        name="course"
        control={control}
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

            <Select.Positioner>
              <Select.Content>
                {collection.items.map((course) => (
                  <Select.Item item={course} key={course.value}>
                    {course.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
