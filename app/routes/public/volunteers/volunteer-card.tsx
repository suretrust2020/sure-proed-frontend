import {
  Avatar,
  Button,
  Card,
  DataList,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { VolunteerType } from "@/lib/types";
import { LinkedinIcon } from "@/lib/icons";
import { ShareIcon } from "lucide-react";
import { useShare } from "@/hooks/use-share";

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
  const share = useShare();

  async function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set("search", volunteer.name);

    const shareInput = {
      title: volunteer.name,
      text: `${volunteer.designation}`,
      url: url.toString(),
    };
    share(shareInput);
  }
  return (
    <Card.Root>
      <Card.Body gap="2">
        <HStack gap="3">
          <Avatar.Root size={"xl"}>
            <Avatar.Image src={volunteer.profile_pic} />
            <Avatar.Fallback name={volunteer.name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {volunteer.name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {volunteer.volunteer_type}
            </Text>
          </Stack>
        </HStack>

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
          <a href={volunteer.linkedinUrl} target={"_blank"}>
            <LinkedinIcon />
            Linkedin
          </a>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
