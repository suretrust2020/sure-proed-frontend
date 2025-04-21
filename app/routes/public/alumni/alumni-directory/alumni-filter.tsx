import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

export function ALumniFilter({
  items,
  name,
}: {
  items: string[];
  name: string;
}) {
  const batchList = createListCollection({
    items: items.map((item) => ({ label: item, value: item })),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.getAll(name);

  function handleFilterChange(values: string[]) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (values.length) {
      values.forEach((v) => {
        newSearchParams.append(name, v);
      });
    } else {
      newSearchParams.delete(name);
    }
    setSearchParams(newSearchParams);
  }
  return (
    <SelectRoot
      variant={"subtle"}
      name={name}
      w={"full"}
      collection={batchList}
      value={value}
      onValueChange={(e) => handleFilterChange(e.value)}
    >
      <SelectLabel srOnly>Filter by {name}</SelectLabel>
      <SelectTrigger clearable>
        <SelectValueText placeholder={`Select ${name}`} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem item={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
