import { InputGroup } from "@/components/ui/input-group";
import { Box, Input, Kbd, type InputProps } from "@chakra-ui/react";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";
import { LuSearch } from "react-icons/lu/index.js";

type SearchInputProps = InputProps & {
  urlSearch?: boolean;
  shallow?: boolean;
};
export function SearchInput({
  urlSearch = true,
  shallow = false,
  ...inputProps
}: SearchInputProps) {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
      shallow,
    })
  );

  const defaultValue = search ?? inputProps.defaultValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box width={"full"}>
      <InputGroup
        flex="1"
        startElement={<LuSearch />}
        endElement={<Kbd>⌘K</Kbd>}
        w={"full"}
      >
        <Input
          ref={inputRef}
          type="search"
          name="search"
          defaultValue={defaultValue}
          variant={"subtle"}
          onChange={handleChange}
          placeholder={inputProps.placeholder ?? "Search..."}
          colorPalette={"purple"}
          {...inputProps}
        />
      </InputGroup>
    </Box>
  );
}
