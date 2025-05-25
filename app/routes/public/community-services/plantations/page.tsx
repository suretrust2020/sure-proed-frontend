import { Box, Container, Flex, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import {
  fetchPlantationData,
  fetchPlantationStats,
} from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { SITE_NAME } from "@/lib/constant";
import { CourseCard } from "../course-card";
import { PlantIcon } from "@/lib/icons";
import { ServicesChart } from "../services-chart";
import { getAuthSession } from "@/auth.server";
import { PlantationForm } from "./plantation-form";
import { fetchAllCourses } from "@/repositories/courses";
import { Plantations } from "@/lib/mongodb/models/plantations";
import { redirect } from "react-router";
import { useAuthStore } from "@/providers/auth-store-provider";

export default function PlatationsPage({ loaderData }: Route.ComponentProps) {
  const featureAccess = useAuthStore((state) => state.featureAccess);
  return (
    <Container>
      <Flex mb={8} justifyContent={"flex-end"}>
        {featureAccess.includes("community-services") && (
          <PlantationForm courses={loaderData.courseList} />
        )}
      </Flex>
      <Box mb={8}>
        <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
          <StatsCard count={loaderData.stats.start} label={"Days"} showPlus />
          <StatsCard
            count={loaderData.stats.volunteers}
            label={"Planters"}
            showPlus
          />
          <StatsCard
            count={loaderData.stats.plants}
            label={"Plants"}
            showPlus
          />
        </SimpleGrid>
      </Box>

      <Box display={["none", "none", "block"]}>
        <ServicesChart serviceType="Plantations" courses={loaderData.courses} />
      </Box>

      <Box mt={8}>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
          <For each={loaderData.courses}>
            {(plantation) => (
              <CourseCard
                serviceIcon={<PlantIcon />}
                course={plantation}
                key={plantation._id}
                href={`/services-for-community/plantations/${plantation.course_name}`}
              />
            )}
          </For>
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export async function loader() {
  const [plantationData, stats, courseList] = await Promise.all([
    fetchPlantationData(),
    fetchPlantationStats(),
    fetchAllCourses(),
  ]);

  return {
    courses: plantationData.map((p) => ({ ...p, course_name: p._id })),
    stats,
    courseList,
  };
}

export function meta() {
  return [
    {
      title: `Plantations | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const session = await getAuthSession(request);
    if (!session) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData.entries());

    const course = formObject.course || "Others";
    const user = formObject.user || "";
    const plants = formObject.plants || 0;
    const batch = formObject.batch || "";
    const slug = course && batch ? `${course}-(${batch})` : "Others";
    const images = formObject.images
      ? JSON.parse((formObject.images as any) || "[]")
      : [];

    const data = {
      images,
      course,
      batch,
      slug,
      plants,
      user,
    };

    await Plantations.create(data);
    return {
      success: true,
      message: "Plantation data added successfully!",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
}
