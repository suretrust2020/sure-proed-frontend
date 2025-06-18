import { Field, InputGroup, NumberInput, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export function BatchInput({
  control,
  error,
}: {
  control: any;
  error?: string;
}) {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label>Batch</Field.Label>
      <Controller
        name="batch"
        control={control}
        render={({ field }) => (
          <NumberInput.Root
            colorPalette={"purple"}
            disabled={field.disabled}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            min={1}
            w={"full"}
          >
            <NumberInput.Control />
            <InputGroup startElement={<Text>G -</Text>}>
              <NumberInput.Input />
            </InputGroup>
          </NumberInput.Root>
        )}
      />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
