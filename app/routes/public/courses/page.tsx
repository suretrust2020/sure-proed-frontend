import {
  Box,
  Container,
  Flex,
  For,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { CourseCard } from "@/components/courses/course-card";
import { CoursesPagination } from "./courses-pagination";
import { CoursesFilter } from "./courses-filter";
import type { Route } from "./+types/page";
import { fetchCourses } from "@/repositories/courses";
import { useSearchParams } from "react-router";

export default function CoursesPage({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const coursesResults = loaderData.results;
  const page = searchParams.get("page") || 1;

  return (
    <Container mx={"auto"}>
      <Flex justify={"space-between"} gap={2} align={"center"} mb={6}>
        <Heading textAlign={"center"} fontSize={"3xl"}>
          6-months Internship Programs
        </Heading>
        <Box>
          <CoursesFilter />
        </Box>
      </Flex>
      <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
        <For each={coursesResults}>
          {(course) => <CourseCard key={course.id} course={course} />}
        </For>
      </SimpleGrid>
      <Flex mt={6} justify={"center"}>
        <CoursesPagination
          pageCount={Number(page)}
          pageSize={12}
          count={loaderData.count}
        />
      </Flex>
    </Container>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  let { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.toString() || "NON MEDICAL";
  const page = Number(searchParams.get("page") || 1);
  const courses = await fetchCourses(category, page);
  return courses;
}
