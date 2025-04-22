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

import { redirect } from "react-router";
import { ProjectCard } from "@/components/github-project-card";
import { EmptyData } from "@/components/empty-data";
import { EnrollCourse } from "./enroll-course";
import { getAuthSession } from "@/auth.server";
import { ProjectDialog } from "./project-dialog";
import {
  fetchGitHubRepoData,
  getAllProjectsByCourseId,
  upsertProject,
} from "@/repositories/projects";

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
            <EnrollCourse courseId={course.id} />
            <ProjectDialog />
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

        {loaderData.projects?.length ? (
          <SimpleGrid gap={4} columns={[1, 2, 3, 4]}>
            <For each={loaderData.projects}>
              {(project) => (
                <ProjectCard key={project._id.toString()} {...project} />
              )}
            </For>
          </SimpleGrid>
        ) : (
          <EmptyData
            title="No projects yet"
            description="It looks like there aren’t any projects to explore right now. Check back later or share your own!"
          />
        )}
      </Container>
    </Box>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const courseId = Number(params.courseId);
  const [course, teachers, projects] = await Promise.all([
    fetchCourseById(courseId),
    fetchCourseTeachers(courseId),
    getAllProjectsByCourseId(courseId),
  ]);

  return {
    course,
    teachers,
    projects,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getAuthSession(request);
  const formData = await request.formData();
  const courseId = Number(formData.get("courseId")?.toString());
  const repoUrl = formData.get("repoUrl")?.toString();
  const intent = formData.get("intent");

  if (intent === "enroll") {
    const enroll = await enrollCourse(courseId, session.get("token"));
    return {
      enroll,
    };
  } else if (intent === "project-preview") {
    const projectPreview = await fetchGitHubRepoData(repoUrl);
    return {
      projectPreview,
    };
  } else if (intent === "project-submit") {
    console.log("project-submit");
    const projectPreview = await fetchGitHubRepoData(repoUrl);
    console.log(projectPreview);
    if (!projectPreview?.success || !projectPreview.data) {
      return {
        ...projectPreview,
      };
    }
    const projectSubmit = await upsertProject({
      author: projectPreview.data.owner.login,
      courseId,
      description: projectPreview.data.description,
      language: projectPreview.data.language,
      link: projectPreview.data.html_url,
      userId: session.get("user_id"),
      name: projectPreview.data.name,
      authorAvatar: projectPreview.data.owner.avatar_url,
    });

    if (projectSubmit) {
      return redirect(`/courses/${courseId}`);
    }

    return {
      success: false,
      message: "Error while submitting project",
    };
  }
}
