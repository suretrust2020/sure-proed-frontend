import { Avatar, Card, DataList, Tag } from "@chakra-ui/react";
import type { VolunteerType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/lib/icons";

export function VolunteerCard({ volunteer }: { volunteer: VolunteerType }) {
  const items = [
    {
      label: "Designation",
      value: volunteer.designation,
    },
    {
      label: "Company",
      value: volunteer.companyName,
    },
    {
      label: "Contribution",
      value: volunteer.contribution,
    },
  ];
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Avatar.Root width={24} height={24}>
          <Avatar.Fallback name={volunteer.name} />
          <Avatar.Image src={volunteer.profile_pic} />
        </Avatar.Root>
        <Card.Title lineClamp={1} fontSize={16} mt="2">
          {volunteer.name}
        </Card.Title>
        <Tag.Root width={"fit-content"} colorPalette={"purple"}>
          <Tag.Label textTransform={"capitalize"}>
            {volunteer.volunteer_type}
          </Tag.Label>
        </Tag.Root>
        <Card.Description>
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
        <Button size={"sm"} asChild variant="subtle">
          <a href={volunteer.linkedinUrl} target={"_blank"}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
