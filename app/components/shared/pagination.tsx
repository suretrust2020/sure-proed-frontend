"use client";

import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router";
import { PAGE_SIZE } from "@/lib/constant";

export function Pagination({
  count,
  pageSize = PAGE_SIZE,
  page,
}: {
  count: number;
  pageSize?: number;
  page: number;
}) {
  const navigate = useNavigate();

  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => {
        navigate(`?page=${e.page}`);
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
