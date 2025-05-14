import { COMMUNITY_SERVICE_USER_ROLES } from "@/lib/constant";
import { createListCollection, Select } from "@chakra-ui/react";

const userRolesColl = createListCollection({
  items: COMMUNITY_SERVICE_USER_ROLES,
});

export function SelectUserRoles() {
  return (
    <Select.Root
      collection={userRolesColl}
      colorPalette={"purple"}
      name="role"
      required
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {userRolesColl.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
