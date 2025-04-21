import { ArrowLeftIcon } from "@/lib/icons";
import { Button, Card, CheckboxCard, Field, For, List } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "../schema";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../signup-provider";
import { useNavigation, useSubmit } from "react-router";

const termsSchema = signupSchema.pick({
  terms: true,
});

type TermsSchema = z.infer<typeof termsSchema>;

export function TermsConditions({
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const { formData, updateFormData } = useSignup();
  const navigation = useNavigation();
  const submit = useSubmit();

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      ...formData,
    },
  });

  function onSubmit(data: any) {
    updateFormData(data);
    submit(
      {
        ...formData,
      },
      { method: "post" }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Terms & Conditions</Card.Title>
        </Card.Header>
        <Card.Body>
          <List.Root mx={"1.5rem"} as="ol" listStyle="decimal" mb={4} gap={2}>
            <For each={terms}>
              {(term, i) => (
                <List.Item
                  fontSize={"sm"}
                  key={i}
                  _marker={{ color: "inherit" }}
                >
                  {term}
                </List.Item>
              )}
            </For>
          </List.Root>

          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Field.Root colorPalette={"purple"} invalid={!!errors.terms}>
                <CheckboxCard.Root
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                  colorPalette={"purple"}
                  w={"full"}
                >
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <CheckboxCard.Indicator />
                    <CheckboxCard.Label>
                      By checking, I accept all terms & conditions.
                    </CheckboxCard.Label>
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
                <Field.ErrorText>{errors.terms?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            variant="outline"
            type="button"
            colorPalette={"purple"}
            size={"sm"}
            onClick={onPrev}
          >
            <ArrowLeftIcon /> Prev
          </Button>
          <Button
            variant="solid"
            type="submit"
            colorPalette={"purple"}
            size={"sm"}
            loading={navigation.formAction?.includes("/signup")}
          >
            Register
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}

const terms = [
  "Student has to turn on video during the entire class.",
  "Attending 8 Life Skills Training sessions during the four months course is mandatory for all the students.",
  "Student should not be a full time or part-time employee anywhere.",
  "Students promise that you will learn the course with commitment, regularity and punctuality, for full four  months duration, abiding by all the rules and discipline of the SURE TRUST.",
];
