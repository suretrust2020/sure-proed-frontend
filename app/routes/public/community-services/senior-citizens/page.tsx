import { Box, Container, Flex, For, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "@/components/stats-card";
import {
  createSeniorCitizen,
  fetchSeniorCitizensStats,
} from "@/repositories/community-services";
import type { Route } from "./+types/page";
import {
  COMMUNITY_SERVICE_PATH,
  COMMUNITY_SERVICES,
  ROUTES,
  SITE_NAME,
} from "@/lib/constant";
import { ServicesChart } from "../services-chart";
import { CourseCard } from "../course-card";
import { HelpIcon } from "@/lib/icons";
import { calculateTimeDifferenceFromNow } from "@/lib/utils";
import { getAuthData, getAuthSession } from "@/auth.server";
import { fetchAllCourses, fetchCourseById } from "@/repositories/courses";
import { env } from "@/lib/env";
import { SeniorCitizenForm } from "./senio-citizen-form";
import { redirect } from "react-router";

export default function SeniorCitizensPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Box>
      <Box mb={8}>
        <Container>
          <Flex mb={8} justifyContent={"flex-end"}>
            {loaderData.courseList && (
              <SeniorCitizenForm courses={loaderData.courseList} />
            )}
          </Flex>
          <SimpleGrid columns={[1, 1, 2, 3]} gap={4}>
            <StatsCard
              count={calculateTimeDifferenceFromNow(
                COMMUNITY_SERVICES.seniorCitizenStartTimestamp
              )}
              label={"Days"}
              showPlus
            />
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
        </Container>
      </Box>
      <Container display={["none", "none", "block"]}>
        <ServicesChart
          serviceType="Senior Citizen"
          courses={loaderData.result.courses}
        />
      </Container>

      <Container mt={8}>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
          <For each={loaderData.result.courses}>
            {(course) => (
              <CourseCard
                course={course}
                key={course.course_name}
                href={`/services-for-community/senior-citizens/${course.course_name}`}
                serviceIcon={<HelpIcon />}
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
    fetchSeniorCitizensStats(),
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

    const resp = await createSeniorCitizen(data, session.data.token);
    if (resp.success) {
      return redirect(`/${COMMUNITY_SERVICE_PATH}/${ROUTES.seniorCitizens}`);
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

export function meta() {
  return [
    {
      title: `Senior Citizens | Services for community | ${SITE_NAME}`,
    },
  ] satisfies Route.MetaDescriptors;
}
