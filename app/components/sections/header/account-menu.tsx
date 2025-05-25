import { useAuthStore } from "@/providers/auth-store-provider";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { UserIcon } from "lucide-react";
import { Link, useNavigation, useSubmit } from "react-router";

export function AccountMenu() {
  const user = useAuthStore((state) => state.user);
  const featureAccess = useAuthStore((state) => state.featureAccess);
  const submit = useSubmit();
  const navigation = useNavigation();

  if (!user) return null;

  function handleLogout() {
    submit(
      {},
      {
        method: "POST",
        action: "/logout",
      }
    );
  }
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
            <Menu.Item asChild value="profile">
              <Link to={"/profile"}>Profile</Link>
            </Menu.Item>
            {featureAccess.includes("admin") && (
              <Menu.Item asChild value="admin">
                <Link to={"/admin"}>Admin</Link>
              </Menu.Item>
            )}

            <Menu.Item
              value="logout"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
              onClick={handleLogout}
              disabled={navigation.formAction?.includes("/logout")}
            >
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
