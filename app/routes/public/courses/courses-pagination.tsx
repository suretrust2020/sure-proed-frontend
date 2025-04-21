import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useNavigate, useSearchParams } from "react-router";

export function CoursesPagination({
  count,
  pageSize,
  pageCount,
}: {
  count: number;
  pageSize: number;
  pageCount: number;
}) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      page={pageCount}
      onPageChange={(e) => {
        navigate(
          `/courses/?page=${e.page}${category ? `&category=${category}` : ""}`
        );
      }}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
}
