import { IconButton } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Link } from "react-router";
import { AppsIcon } from "@/lib/icons";
import { commonLinks } from "./links";
import { useAuthStore } from "@/providers/auth-store-provider";

export const authLinks = [
  { name: "Login", href: "/login" },
  { name: "Signup", href: "/signup" },
];

export function MenuLinks() {
  const user = useAuthStore((state) => state.user);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" aria-label="More Menu">
          <AppsIcon />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {!user && (
          <>
            <MenuItemGroup>
              {authLinks.map(({ name, href }) => (
                <MenuItem key={name} asChild value={name}>
                  <Link to={href}>{name}</Link>
                </MenuItem>
              ))}
            </MenuItemGroup>
            <MenuSeparator />
          </>
        )}
        <MenuItemGroup>
          {commonLinks.map(({ name, href }) => (
            <MenuItem key={name} asChild value={name}>
              <Link to={href}>{name}</Link>
            </MenuItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
}
