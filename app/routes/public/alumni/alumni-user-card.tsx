import { Avatar, Card, DataList, Tag } from "@chakra-ui/react";
import type { AlumniUserType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, ShareIcon } from "@/lib/icons";
import { copyToClipboard } from "@/lib/utils";
import { toaster } from "@/components/ui/toaster";

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

  async function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set("search", name);
    console.log(url.href);
    const hasCopy = await copyToClipboard(url.href);
    if (hasCopy) {
      toaster.create({
        title: "Copied to clipboard",
        type: "info",
        duration: 3000,
      });
    }
  }
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Avatar.Root width={24} height={24}>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={profile_pic} />
        </Avatar.Root>
        <Card.Title lineClamp={1} fontSize={16} mt="2">
          {name}
        </Card.Title>
        <Tag.Root width={"fit-content"} colorPalette={"purple"}>
          <Tag.Label textTransform={"capitalize"}>
            {placement_company.designation}
          </Tag.Label>
        </Tag.Root>
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
        <Button size={"sm"} asChild variant="subtle">
          <a href={linkedin_url} target={"_blank"}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
