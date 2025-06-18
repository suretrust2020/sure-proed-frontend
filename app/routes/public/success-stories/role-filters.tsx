import { createListCollection, Select } from "@chakra-ui/react";
import { roleValues } from "./config";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export function RoleFilters() {
  const collection = createListCollection({
    items: [...roleValues].map((role) => ({
      label: role.charAt(0).toUpperCase() + role.slice(1),
      value: role,
    })),
  });
  const [roles, setRoles] = useQueryState(
    "roles",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
    })
  );

  return (
    <Select.Root
      multiple
      name="roles"
      value={roles}
      onValueChange={({ value }) => {
        setRoles(value);
      }}
      collection={collection}
      colorPalette={"purple"}
      w="40"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Filter Role" />
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
