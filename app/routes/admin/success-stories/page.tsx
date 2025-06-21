import { Box, Heading, Stack } from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { Pagination } from "@/components/shared/pagination";
import { redirect, useSearchParams } from "react-router";
import { PAGE_SIZE } from "@/lib/constant";
import {
  getSuccessStories,
  updateSuccessStories,
} from "@/repositories/success-story";
import { DataTable } from "./data-table";

export default function SuccessStoriesPage({
  loaderData,
}: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Success Stories</Heading>
      {loaderData?.successStories && (
        <DataTable {...loaderData.successStories} />
      )}
      <Box alignSelf={"center"}>
        {loaderData?.successStories && (
          <Pagination
            count={loaderData.successStories.total}
            page={page}
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
    const successStories = await getSuccessStories({ page, limit: PAGE_SIZE });
    return {
      successStories,
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
  const data = await updateSuccessStories({
    id,
    status,
  });

  if (data) {
    return redirect("/admin/success-stories");
  }
  return {
    error: "Failed to update status try again.",
  };
}
