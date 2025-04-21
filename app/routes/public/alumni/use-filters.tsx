import type { AlumniUserType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useFilters({ users }: { users: AlumniUserType[] }) {
  const [results, setResults] = useState<AlumniUserType[]>(users);
  const [searchParams] = useSearchParams();

  const selectedBatch = searchParams.get("batch") || "";
  const selectedCourse = searchParams.get("course") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    function filterResults() {
      return users.filter((item) => {
        // Filter by batch
        const batchMatch = selectedBatch
          ? item.batches.some((batch) => batch.batch_name === selectedBatch)
          : true;

        // Filter by course
        const courseMatch = selectedCourse
          ? item.batches.some(
              (batch) => batch.course__course_name === selectedCourse
            )
          : true;

        // Filter by search query
        const searchLower = search?.toLowerCase() || "";
        const searchMatch = searchLower
          ? item.name.toLowerCase().includes(searchLower) ||
            item.user.email.toLowerCase().includes(searchLower) ||
            item.phone.toString().includes(searchLower) ||
            item.placement_company?.company_name
              .toLowerCase()
              .includes(searchLower) ||
            item.linkedin_url?.toLowerCase().includes(searchLower)
          : true;

        return batchMatch && courseMatch && searchMatch;
      });
    }

    const results = filterResults();
    setResults(results);
  }, [search, selectedBatch, selectedCourse]);

  return {
    results,
  };
}
