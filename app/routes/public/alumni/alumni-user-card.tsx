import { Avatar, Card, DataList, HStack, Stack, Text } from "@chakra-ui/react";
import type { AlumniUserType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, ShareIcon } from "@/lib/icons";
import { useShare } from "@/hooks/use-share";

export function AlumniUserCard({
  placement_company,
  name,
  linkedin_url,
  profile_pic,
}: AlumniUserType) {
  const items = [
    {
      label: "Company",
      value: placement_company.company_name,
    },
    {
      label: "Designation",
      value: placement_company.designation,
    },
    {
      label: "Role",
      value: placement_company.role,
    },
  ];

  const share = useShare();

  async function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set("search", name);

    const shareInput = {
      title: name,
      text: `${placement_company.bio}`,
      url: url.toString(),
    };
    share(shareInput);
  }

  return (
    <Card.Root>
      <Card.Body gap="2">
        <HStack gap="3">
          <Avatar.Root size={"xl"}>
            <Avatar.Image src={profile_pic} />
            <Avatar.Fallback name={name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {placement_company.designation}
            </Text>
          </Stack>
        </HStack>
        <Card.Description asChild>
          <DataList.Root orientation="vertical" gap={3} mt={3}>
            {items.map((item) => (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel fontWeight={"semibold"}>
                  {item.label}
                </DataList.ItemLabel>
                <DataList.ItemValue>{item.value}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={handleShare}
          size={"sm"}
          variant="solid"
          colorPalette={"purple"}
        >
          <ShareIcon />
          Share
        </Button>
        <Button size={"sm"} asChild variant="surface">
          <a href={linkedin_url} target={"_blank"}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
