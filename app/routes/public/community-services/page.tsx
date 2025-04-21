import { Container, Flex, For, Heading, SimpleGrid } from "@chakra-ui/react";
import { BloodIcon, PlantIcon, UsersIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
export default function ServicesForCommunityPage() {
  const services = [
    {
      name: "Plantation",
      slug: "plantations",
      icon: PlantIcon,
    },
    {
      name: "Blood Donations",
      slug: "blood-donations",
      icon: BloodIcon,
    },
    {
      name: "Service To Senior Citizens",
      slug: "senior-citizens",
      icon: UsersIcon,
    },
  ];
  return (
    <Container>
      <Heading textAlign={"center"} fontSize={"3xl"} mb={12}>
        Services For Community
      </Heading>
      <Flex justifyContent={"center"} wrap={"wrap"} gap={4}>
        <For each={services}>
          {({ icon: Icon, name, slug }) => (
            <Button key={name} asChild size={"2xl"} variant={"subtle"}>
              <Link to={`/services-for-community/${slug}`}>
                <Icon size={24} />
                {name}
              </Link>
            </Button>
          )}
        </For>
      </Flex>
    </Container>
  );
}
