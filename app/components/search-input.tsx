import { InputGroup } from "@/components/ui/input-group";
import { Box, Input, Kbd, type InputProps } from "@chakra-ui/react";
import React from "react";
import { LuSearch } from "react-icons/lu/index.js";
import { useSearchParams } from "react-router";

type SearchInputProps = InputProps & {
  urlSearch?: boolean;
};
export function SearchInput({
  urlSearch = true,
  ...inputProps
}: SearchInputProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = inputProps.name || "search";
  const defaultValue = urlSearch
    ? searchParams.get(key)?.toString()
    : inputProps.defaultValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set(key, e.target.value);
    } else {
      newSearchParams.delete(key);
    }

    setSearchParams(newSearchParams);
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
