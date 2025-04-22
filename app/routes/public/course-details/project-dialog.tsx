import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ProjectForm } from "./project-form";
import { PlusIcon } from "lucide-react";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useState } from "react";

export function ProjectDialog() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon />
          Create Project
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Github project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <ProjectForm onFormSubmit={() => setOpen(false)} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Description fontSize={"xs"}>
                <b>Note:</b> Occasionally, GitHub’s API limit may be reached. If
                your preview doesn’t load, please wait a minute and try
                submitting again.
              </Dialog.Description>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
