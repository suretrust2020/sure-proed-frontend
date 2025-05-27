import { Box, For, HStack, Text, VStack } from "@chakra-ui/react";
import { FolderGit2Icon, LeafIcon, ShieldUserIcon } from "lucide-react";
import { NavLink } from "react-router";

export function SidebarLinks() {
  const links = [
    {
      name: "Admin",
      icon: <ShieldUserIcon size={16} />,
      link: "/admin",
    },
    {
      name: "Projects",
      icon: <FolderGit2Icon size={16} />,
      link: "/admin/projects",
    },
    {
      name: "Plantations",
      icon: <LeafIcon size={16} />,
      link: "/admin/plantations",
    },
  ];
  return (
    <VStack as="nav" gap="1" align="start">
      <For each={links}>
        {({ icon, name, link }) => (
          <NavLink
            to={link}
            key={link}
            style={{ width: "100%", display: "block" }}
            end
          >
            {({ isActive }) => (
              <HStack
                bg={isActive ? "purple.subtle" : "transparent"}
                py={1.5}
                px={2}
                _hover={{
                  background: "purple.subtle",
                }}
                rounded={"md"}
                gap={2}
              >
                <Box>{icon}</Box>
                <Text fontSize={"sm"}>{name}</Text>
              </HStack>
            )}
          </NavLink>
        )}
      </For>
    </VStack>
  );
}
