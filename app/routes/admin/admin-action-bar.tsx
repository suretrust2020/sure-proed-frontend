import { ActionBar, Button, For, Group, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useFetcher } from "react-router";

export function AdminActionBar({
  open,
  selection,
  onClear,
}: {
  open: boolean;
  selection: any[];
  onClear?: () => void;
}) {
  const statusActions = [
    { label: "Approve", status: "approved" },
    { label: "Decline", status: "declined" },
  ];
  const [clickedStatus, setClickedStatus] = useState<string | null>(null);
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  async function handleStatusAction(status: string) {
    setClickedStatus(status);
    await fetcher.submit(
      { status, ids: selection },
      {
        method: "post",
      }
    );
    onClear?.();
  }

  return (
    <ActionBar.Root open={open}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              {selection.length} selected
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Group attached>
              <For each={statusActions}>
                {(action) => (
                  <Button
                    key={action.label}
                    onClick={() => handleStatusAction(action.status)}
                    variant={"surface"}
                    size={"xs"}
                    loading={busy && clickedStatus === action.status}
                  >
                    {action.label}
                  </Button>
                )}
              </For>
            </Group>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}
