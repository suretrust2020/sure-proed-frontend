import {
  Box,
  Container,
  For,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TeacherCard } from "./teacher-card";
import { SyllabusDialog } from "./syllabus-dialog";

import type { Route } from "./+types/page";
import {
  enrollCourse,
  fetchCourseById,
  fetchCourseTeachers,
} from "@/repositories/courses";
import { fetchGithubProjects } from "@/repositories/github";
import { Await, redirect } from "react-router";
import { Suspense } from "react";
import { GithubProjectCard } from "@/components/github-project-card";
import { EmptyData } from "@/components/empty-data";
import { EnrollCourse } from "./enroll-course";
import { getAuthSession } from "@/auth.server";

export default function CourseDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const course = loaderData.course;
  const teachers = loaderData.teachers;

  return (
    <Box>
      <Container>
        <VStack gap={3} mb={16}>
          <Heading lineHeight={1} fontSize={"4xl"} textAlign={"center"}>
            {course.course_name}
          </Heading>

          <Text className="text-xl">{course.prerequisites}</Text>

          <HStack mt={6}>
            {/* {session && <EnrollCourseForm courseId={params.id} />} */}
            <EnrollCourse courseId={course.id} />
            {course.syllabus && (
              <SyllabusDialog
                courseName={course.course_name}
                syllabus={course.syllabus}
              />
            )}
          </HStack>
        </VStack>
      </Container>
      <Box mb={16} bg={"bg.muted"} py={12}>
        <Container>
          <Heading fontSize={"3xl"} mb={12} textAlign={"center"}>
            Trainers
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
            <For each={teachers}>
              {(teacher) => <TeacherCard key={teacher.id} teacher={teacher} />}
            </For>
          </SimpleGrid>
        </Container>
      </Box>
      <Container>
        <Heading fontSize={"3xl"} mb={12} textAlign={"center"}>
          Github Projects
        </Heading>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={loaderData?.githubProjectsPromise}>
            {(projects) =>
              projects.length ? (
                <SimpleGrid gap={4} columns={[1, 2, 3]}>
                  <For each={projects}>
                    {(project) => (
                      <GithubProjectCard key={project.title} {...project} />
                    )}
                  </For>
                </SimpleGrid>
              ) : (
                <EmptyData
                  title="No projects yet"
                  description="It looks like there aren’t any projects to explore right now. Check back later or share your own!"
                />
              )
            }
          </Await>
        </Suspense>
      </Container>
    </Box>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const course = await fetchCourseById(params.courseId);
  const teachers = await fetchCourseTeachers(params.courseId);
  const githubProjectsPromise = fetchGithubProjects(params.courseId);
  return {
    course,
    teachers,
    githubProjectsPromise,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const courseId = formData.get("courseId")?.toString();
  const session = await getAuthSession(request);
  const resp = await enrollCourse(courseId, session.get("token"));
  return resp;
}
