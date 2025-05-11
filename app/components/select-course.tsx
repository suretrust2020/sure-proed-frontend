import type { CourseListType } from "@/lib/types";
import { createListCollection, Portal, Select } from "@chakra-ui/react";

export function SelectCourse({ courses }: { courses: CourseListType[] }) {
  const collection = createListCollection({
    items: courses.map((course) => ({
      label: course.course_name,
      value: String(course.id),
    })),
  });

  return (
    <Select.Root name="course" collection={collection} colorPalette={"purple"}>
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
  );
}
