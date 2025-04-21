import {
  Box,
  HStack,
  Flex,
  Button,
  IconButton,
  Container,
  Skeleton,
  Group,
} from "@chakra-ui/react";
import { Logo } from "@/components/logo";
import { Await, Link, NavLink } from "react-router";
import { ColorModeButton } from "@/components/ui/color-mode";
import { MenuLinks } from "./menu-links";
import { Tooltip } from "@/components/ui/tooltip";
import { GithubIcon } from "@/lib/icons";
import type { NoticeType } from "@/lib/types";
import React from "react";
import { Notice } from "../notice";
import { importantLinks } from "./links";
import { useAuthStore } from "@/providers/auth-store-provider";
import { AccountMenu } from "./account-menu";

export function Header({
  noticesPromise,
}: {
  noticesPromise: Promise<NoticeType[]>;
}) {
  const user = useAuthStore((state) => state.user);
  return (
    <Box
      as="nav"
      mx="auto"
      w="full"
      zIndex={100}
      pos={"sticky"}
      top={0}
      background={"gray.subtle"}
    >
      <React.Suspense fallback={<Skeleton height={"44px"}></Skeleton>}>
        <Await resolve={noticesPromise}>
          {(value) => <Notice notices={value} />}
        </Await>
      </React.Suspense>
      <Container w="full" py={2}>
        <Flex justify="space-between" align="center" gap={0}>
          <Logo />
          <Group gap={4} display={["none", "none", "none", "flex"]}>
            {importantLinks.map((link) => (
              <NavLink to={link.href}>
                {({ isActive }) => (
                  <Box
                    color={isActive ? "purple.500" : "fg.muted"}
                    fontSize="sm"
                    fontWeight="semibold"
                    borderRadius="md"
                    transition="all 0.2s ease-in-out"
                    _hover={{
                      color: "purple.500",
                    }}
                  >
                    {link.name}
                  </Box>
                )}
              </NavLink>
            ))}
          </Group>
          <HStack>
            {!user && (
              <HStack gap={1}>
                <Button
                  asChild
                  variant="outline"
                  colorPalette={"purple"}
                  size={"sm"}
                >
                  <Link to={"/login"}> Login</Link>
                </Button>
              </HStack>
            )}

            {/* Common on all screen  */}
            <HStack>
              <MenuLinks />
              <AccountMenu />
              <Tooltip content={"Github"}>
                <IconButton variant={"plain"} asChild aria-label="Github">
                  <a target="_blank" href={"https://github.com/sure-trust"}>
                    <GithubIcon size={20} />
                  </a>
                </IconButton>
              </Tooltip>
              <ColorModeButton />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
