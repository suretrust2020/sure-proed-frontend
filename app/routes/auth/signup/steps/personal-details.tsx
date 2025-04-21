import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { GenderRadio } from "../gender-radio";
import { useForm } from "react-hook-form";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schema";
import type { z } from "zod";
import { useSignup } from "../signup-provider";

const personalDetailsSchema = signupSchema.pick({
  fullName: true,
  phone: true,
  qualification: true,
  gender: true,
});

export function PersonalDetails({
  onPrev,
  onNext,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const { formData, updateFormData } = useSignup();

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      ...formData,
    },
  });

  function onSubmit(data: any) {
    updateFormData(data);
    onNext?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Personal Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root colorPalette={"purple"} invalid={!!errors.fullName}>
              <Field.Label>Full name</Field.Label>
              <Input type="text" {...register("fullName")} />
              <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root colorPalette={"purple"} invalid={!!errors.phone}>
              <Field.Label>Phone</Field.Label>
              <Input type="tel" {...register("phone")} />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              colorPalette={"purple"}
              invalid={!!errors.qualification}
            >
              <Field.Label>Qualification</Field.Label>
              <Input type="text" {...register("qualification")} />
              <Field.ErrorText>{errors.qualification?.message}</Field.ErrorText>
            </Field.Root>
            <GenderRadio
              control={control}
              invalid={!!errors.gender}
              message={errors.gender?.message}
            />
          </Stack>
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
            variant="outline"
            type="submit"
            colorPalette={"purple"}
            size={"sm"}
          >
            Next <ArrowRightIcon />
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}
