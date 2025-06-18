import { Fieldset, HStack, RadioCard } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { roles } from "../config";

export function SelectRoles({
  error,
  control,
}: {
  error?: string;
  control: any;
}) {
  return (
    <Fieldset.Root invalid={!!error}>
      <Fieldset.Legend>Choose Role</Fieldset.Legend>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <RadioCard.Root
            orientation="vertical"
            colorPalette={"purple"}
            variant={"surface"}
            align="center"
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
          >
            <HStack w="full">
              {roles.map((item) => (
                <RadioCard.Item key={item.value} value={item.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl maxW={"full"}>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        )}
      />
      {error && <Fieldset.ErrorText>{error}</Fieldset.ErrorText>}
    </Fieldset.Root>
  );
}
