import { ArrowRightIcon } from "@/lib/icons";
import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { signupSchema } from "../schema";
import type { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignup } from "../signup-provider";
const accountDetailsSchema = signupSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AccountDetailsSchema = z.infer<typeof accountDetailsSchema>;
export function AccountDetails({
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
    resolver: zodResolver(accountDetailsSchema),
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
          <Card.Title>Account Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root colorPalette={"purple"} invalid={!!errors.email}>
              <Field.Label>Email address</Field.Label>
              <Input {...register("email")} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root colorPalette={"purple"} invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Input {...register("password")} type="password" />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              colorPalette={"purple"}
              invalid={!!errors.confirmPassword}
            >
              <Field.Label>Confirm Password</Field.Label>
              <Input {...register("confirmPassword")} type="password" />

              <Field.ErrorText>
                {errors.confirmPassword?.message}
              </Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
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
