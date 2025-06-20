import { Button, Menu, Portal } from "@chakra-ui/react";
import { useFetcher } from "react-router";

export function StatusMenu({
  id,
  status = "pending",
}: {
  id: any;
  status?: string;
}) {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button loading={busy} variant="outline" size="xs">
          Status
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.RadioItemGroup
              value={status}
              onValueChange={(e) => {
                fetcher.submit(
                  { status: e.value, id },
                  {
                    method: "post",
                  }
                );
              }}
            >
              {items.map((item) => (
                <Menu.RadioItem
                  color={item.color}
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

const items = [
  { label: "Approve", value: "approved", color: "fg.success" },
  { label: "Decline", value: "declined", color: "fg.error" },
  { label: "Pending", value: "pending" },
];
