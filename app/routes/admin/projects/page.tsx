import { Box, Heading, Stack } from "@chakra-ui/react";
import type { Route } from "./+types/page";
import {
  getAllProjects,
  updateProject,
  upsertProject,
} from "@/repositories/projects";
import { ProjectsTable } from "./project-table";
import { Pagination } from "@/components/shared/pagination";
import { redirect, useSearchParams } from "react-router";
import { PAGE_SIZE } from "@/lib/constant";

export default function AdminHome({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Projects</Heading>
      {loaderData?.projects && <ProjectsTable {...loaderData.projects} />}
      <Box alignSelf={"center"}>
        {loaderData?.projects && (
          <Pagination
            count={loaderData.projects.total}
            page={Number(searchParams.get("page"))}
            pageSize={PAGE_SIZE}
          />
        )}
      </Box>
    </Stack>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const projects = await getAllProjects({ page, limit: PAGE_SIZE });
    return {
      projects,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData();
  const status = formData.get("status")?.toString();
  const id = formData.get("id")?.toString();
  const data = await updateProject({
    status,
    id,
  });

  if (data) {
    return redirect("/admin/projects");
  }
  return {
    error: "Failed to update status try again.",
  };
}
