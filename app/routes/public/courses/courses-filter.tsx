import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router";

const filters = createListCollection({
  items: [
    { label: "Non Medical", value: "NON MEDICAL" },
    { label: "Medical", value: "MEDICAL" },
  ],
});
export function CoursesFilter() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = [searchParams.get("category") ?? "NON MEDICAL"];

  return (
    <SelectRoot
      value={category}
      onValueChange={(e) => {
        navigate(`/courses/?category=${e.value}`);
      }}
      variant={"subtle"}
      collection={filters}
      w={"40"}
    >
      <SelectLabel hidden>Filter courses</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Filter courses" />
      </SelectTrigger>
      <SelectContent>
        {filters.items.map((filter) => (
          <SelectItem item={filter} key={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
