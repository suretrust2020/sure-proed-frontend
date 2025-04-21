import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../schema";
import type { z } from "zod";
import { useSignup } from "../signup-provider";

const collegeSchema = signupSchema.pick({
  college_district: true,
  college_name: true,
  college_place: true,
  college_state: true,
});

type CollegeSchema = z.infer<typeof collegeSchema>;
export function CollegeDetails({
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
  } = useForm({
    resolver: zodResolver(collegeSchema),
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
          <Card.Title>College Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root colorPalette={"purple"} invalid={!!errors.college_name}>
              <Field.Label>College Name</Field.Label>
              <Input type="text" {...register("college_name")} />
              <Field.ErrorText>{errors.college_name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              colorPalette={"purple"}
              invalid={!!errors.college_place}
            >
              <Field.Label>College Place</Field.Label>
              <Input type="text" {...register("college_place")} />
              <Field.ErrorText>{errors.college_place?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              colorPalette={"purple"}
              invalid={!!errors.college_district}
            >
              <Field.Label>College District</Field.Label>
              <Input type="text" {...register("college_district")} />
              <Field.ErrorText>
                {errors.college_district?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root
              colorPalette={"purple"}
              invalid={!!errors.college_state}
            >
              <Field.Label>College State</Field.Label>
              <Input type="text" {...register("college_state")} />
              <Field.ErrorText>{errors.college_state?.message}</Field.ErrorText>
            </Field.Root>
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
