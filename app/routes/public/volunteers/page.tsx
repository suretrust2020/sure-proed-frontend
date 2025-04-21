import { getVolunteers } from "@/repositories/volunteers";
import type { Route } from "./+types/page";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { VolunteerEnum, type VolunteerType } from "@/lib/types";
import { VolunteerCard } from "./volunteer-card";
import { EmptyData } from "@/components/empty-data";
import { SearchInput } from "@/components/search-input";
import { Form } from "react-router";

export default function VolunteersPage({ loaderData }: Route.ComponentProps) {
  return (
    <Container>
      <VStack gap={6} mb={12}>
        <VStack>
          <Heading textAlign={"center"} fontSize={"3xl"}>
            Volunteers
          </Heading>
          <Text>Hands That Help and Hearts That Care</Text>
        </VStack>
        <Form style={{ width: "100%" }} action="/volunteers">
          <Box maxW={"md"} mx={"auto"}>
            <SearchInput />
          </Box>
        </Form>
      </VStack>
      <Tabs.Root defaultValue={VolunteerEnum.CORPORATE} variant={"subtle"}>
        <Tabs.List>
          <Tabs.Trigger value={VolunteerEnum.CORPORATE}>
            Corporates
          </Tabs.Trigger>
          <Tabs.Trigger value={VolunteerEnum.STUDENT}>Students</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={VolunteerEnum.CORPORATE}>
          {loaderData.corporateVolunteers.length ? (
            <SimpleGrid gap={4} columns={[1, 1, 2, 3, 4]}>
              {loaderData.corporateVolunteers.map((volunteer) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </SimpleGrid>
          ) : (
            <EmptyData
              title="Corporate volunteers"
              description="Nothing to show here yet"
            />
          )}
        </Tabs.Content>
        <Tabs.Content value={VolunteerEnum.STUDENT}>
          {loaderData.studentVolunteers.length ? (
            <SimpleGrid gap={4} columns={[1, 1, 2, 3, 4]}>
              {loaderData.studentVolunteers.map((volunteer) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </SimpleGrid>
          ) : (
            <EmptyData
              title="Student volunteers"
              description="Nothing to show here yet"
            />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.toString().toLowerCase() || "";

  const volunteers = await getVolunteers();

  let corporateVolunteers: VolunteerType[] = volunteers.filter(
    (volunteer) => volunteer.volunteer_type === "corporate"
  );

  let studentVolunteers: VolunteerType[] = volunteers.filter(
    (volunteer) => volunteer.volunteer_type === "student"
  );

  if (search) {
    corporateVolunteers = corporateVolunteers.filter((volunteer) =>
      volunteer.name.toLowerCase().includes(search)
    );

    studentVolunteers = studentVolunteers.filter((volunteer) =>
      volunteer.name.toLowerCase().includes(search)
    );
  }

  return {
    corporateVolunteers,
    studentVolunteers,
  };
}
