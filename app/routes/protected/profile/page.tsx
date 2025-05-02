import { Container, SimpleGrid } from "@chakra-ui/react";
import { ProfileHeader } from "./header";
import { PlantationCard } from "./plantation";
import { BloodDonationCard } from "./blood-donation";
import { SeniorServiceCard } from "./senior-citizen";
import { EnrolledBatchCard } from "./enrolled-batch";
import { fetchProfile } from "@/repositories/users";
import type { Route } from "./+types/page";
import { getAuthSession } from "@/auth.server";
import { redirect } from "react-router";

export default function ProfileRoute({ loaderData }: Route.ComponentProps) {
  return (
    <Container maxW="container.xl" py={8} px={4}>
      <ProfileHeader student={loaderData.profile} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={8}>
        {/* <PlantationCard data={studentData.plantation} />
        <BloodDonationCard data={studentData.bloodDonation} />
        <SeniorServiceCard data={studentData.seniorService} />
        <EnrolledBatchCard data={studentData.enrolledBatch} /> */}
      </SimpleGrid>
    </Container>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);
  const profile = await fetchProfile(
    session.get("regno"),
    session.get("token")
  );
  if (!profile.success || !profile.data) {
    return redirect("/");
  }
  return {
    profile: profile.data,
  };
}
