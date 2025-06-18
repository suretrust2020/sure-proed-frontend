import { Checkbox, Field } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export function EmploymentInput({
  control,
  error,
}: {
  control: any;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name="employed"
      render={({ field }) => (
        <Field.Root invalid={!!error} colorPalette={"purple"}>
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={({ checked }) => field.onChange(checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Are you currently Employed ?</Checkbox.Label>
          </Checkbox.Root>
          <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
}
