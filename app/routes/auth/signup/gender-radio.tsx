import { Fieldset, RadioCard, SimpleGrid } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export function GenderRadio({
  control,
  invalid,
  message,
}: {
  control: any;
  invalid: boolean;
  message?: string;
}) {
  return (
    <Fieldset.Root invalid={invalid}>
      <Fieldset.Legend>Select Gender</Fieldset.Legend>
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <RadioCard.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            size={"sm"}
            colorPalette={"purple"}
          >
            <SimpleGrid columns={[1, 2, 3]} gap={3}>
              {items.map((item) => (
                <RadioCard.Item key={item.value} value={item.value}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl justifyContent={"space-between"}>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </SimpleGrid>
          </RadioCard.Root>
        )}
      />
      <Fieldset.ErrorText>{message}</Fieldset.ErrorText>
    </Fieldset.Root>
  );
}

const items = [
  { value: "male", title: "Male" },
  { value: "female", title: "Female" },
  { value: "other", title: "Other" },
];
