import { Box, Heading, Stack } from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { getAllProjects } from "@/repositories/projects";
import { ProjectsTable } from "./project-table";
import { Pagination } from "@/components/shared/pagination";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "@/lib/constant";

export default function AdminHome({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Projects</Heading>
      <ProjectsTable {...loaderData} />
      <Box alignSelf={"center"}>
        <Pagination
          count={loaderData.total}
          page={Number(searchParams.get("page"))}
          pageSize={PAGE_SIZE}
        />
      </Box>
    </Stack>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;

  const resp = await getAllProjects({ page, limit: PAGE_SIZE });
  return resp;
}
