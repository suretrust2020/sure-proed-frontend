import { useAuthStore } from "@/providers/auth-store-provider";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { UserIcon } from "lucide-react";

export function AccountMenu() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="plain">
          <UserIcon size={24} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile">Profile</Menu.Item>
            <Menu.Item
              value="delete"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
            >
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
