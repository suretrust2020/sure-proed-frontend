import { Box, Container, Flex, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import {
  createBloodDonation,
  fetchBloodDonationStats,
} from "@/repositories/community-services";
import type { Route } from "./+types/page";
import { COMMUNITY_SERVICE_PATH, ROUTES, SITE_NAME } from "@/lib/constant";
import { ServicesChart } from "../services-chart";
import { CourseCard } from "../course-card";
import { BloodIcon } from "@/lib/icons";
import { env } from "@/lib/env";
import { fetchAllCourses, fetchCourseById } from "@/repositories/courses";
import { getAuthData, getAuthSession } from "@/auth.server";
import { BloodDonationForm } from "./blood-donation-form";
import { redirect } from "react-router";

export default function PlatationsPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Container>
        <Flex mb={8} justifyContent={"flex-end"}>
          {loaderData.authorized && (
            <BloodDonationForm courses={loaderData.courseList} />
          )}
        </Flex>
        <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
          <StatsCard count={loaderData.result.start} label={"Days"} />
          <StatsCard
            count={loaderData.result.volunteers}
            label={"Volunteers"}
            showPlus
          />
          <StatsCard
            count={loaderData.result.courses.length}
            label={"Courses"}
            showPlus
          />
        </SimpleGrid>

        <Box display={["none", "none", "block"]}>
          <ServicesChart
            serviceType="Blood Donations"
            courses={loaderData.result.courses}
          />
        </Box>

        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4} mt={8}>
          <For each={loaderData.result.courses}>
            {(course) => (
              <CourseCard
                course={course}
                key={course.course_name}
                href={`/services-for-community/blood-donations/${course.course_name}`}
                serviceIcon={<BloodIcon />}
              />
            )}
          </For>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const [session, result, courseList] = await Promise.all([
    getAuthData(request),
    fetchBloodDonationStats(),
    fetchAllCourses(),
  ]);

  let authorized = false;
  if (session?.user) {
    authorized = false;
    authorized = !!env.COMMUNITY_SERVICES_USERS?.split(",")
      .filter(Boolean)
      .includes(String(session.user.id));
  }

  return {
    result,
    authorized,
    courseList,
  };
}

export function meta() {
  return [
    {
      title: `Blood Donations | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const session = await getAuthSession(request);
    if (!session.data.token) {
      return redirect("/login");
    }
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
    const images = formObject?.images
      ? JSON.parse(formObject.images as any)
      : [];

    const courseId = formObject.course as any;
    const blood_group = "O+";
    const batch_name = formObject.batch || undefined;
    const image = images.length
      ? { image_url: images[0].url, public_id: images[0].publicId }
      : {};
    const user_role = formObject.role || "";
    const donar_name = formObject.user || "";

    const course = await fetchCourseById(courseId);

    let course_name = "Others";
    if (course) {
      course_name = course.course_name;
    }

    const data = {
      ...image,
      course_name,
      batch_name,
      blood_group,
      user_role,
      donar_name,
    };

    const resp = await createBloodDonation(data, session.data.token);
    if (resp.success) {
      return redirect(`/${COMMUNITY_SERVICE_PATH}/${ROUTES.bloodDonations}`);
    }
    return resp;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
}
