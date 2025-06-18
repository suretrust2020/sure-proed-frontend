import { Field, HStack, RadioCard } from "@chakra-ui/react";
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
    <Field.Root invalid={!!error}>
      <Field.Label>Choose Role</Field.Label>
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
            w={"full"}
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
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
