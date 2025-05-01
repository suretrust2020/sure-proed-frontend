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

          <HStack mt={6} wrap={"wrap"}>
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
              {(project) => <ProjectCard key={project._id} {...project} />}
            </For>
          </SimpleGrid>
        ) : (
          <EmptyData
            title="No projects yet"
            description="It looks like there aren’t any projects to explore right now. Check back later or share your own!"
          />
        )}
        {/* <Confetti width={1400} height={600} numberOfPieces={100} /> */}
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

  const courseId = Number(formData.get("courseId"));
  const repoUrl = formData.get("repoUrl")?.toString();
  const intent = formData.get("intent")?.toString();

  if (!intent || isNaN(courseId)) {
    return {
      success: false,
      message: "Invalid request parameters.",
    };
  }

  const token = session.get("token");
  const userId = session.get("user_id");

  const handlers: Record<string, () => Promise<unknown>> = {
    enroll: async () => {
      const enroll = await enrollCourse(courseId, token);
      return { enroll };
    },

    "project-preview": async () => {
      if (!repoUrl) {
        return { success: false, message: "Repository URL is required." };
      }
      const projectPreview = await fetchGitHubRepoData(repoUrl);
      return { projectPreview };
    },

    "project-submit": async () => {
      if (!repoUrl || !userId) {
        return { success: false, message: "Missing repo URL or user session." };
      }

      const preview = await fetchGitHubRepoData(repoUrl);
      if (!preview?.success || !preview.data) {
        return { ...preview };
      }

      const data = preview.data;
      const submission = await upsertProject({
        author: data.owner.login,
        courseId,
        description: data.description,
        language: data.language,
        link: data.html_url,
        userId,
        name: data.name,
        authorAvatar: data.owner.avatar_url,
      });

      if (submission) {
        return redirect(`/courses/${courseId}`);
      }

      return {
        success: false,
        message: "Error while submitting project.",
      };
    },
  };

  const handler = handlers[intent];
  if (!handler) {
    return {
      success: false,
      message: "Unsupported action intent.",
    };
  }

  return await handler();
}
