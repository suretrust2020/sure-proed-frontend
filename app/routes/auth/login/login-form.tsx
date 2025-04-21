import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "./schema";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

export function LoginForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading =
    navigation.state !== "idle" && navigation.formAction?.includes("/login");
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginSchema) {
    submit(
      {
        ...data,
        login_as: "student",
      },
      {
        method: "post",
      }
    );
  }

  const data = useActionData();

  useEffect(() => {
    if (data) {
      toaster.create({
        title: data.success ? "Success" : "Error",
        type: data.success ? "success" : "error",
        description: data.message ?? "Something went wrong",
      });
    }
  }, [data]);

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4">
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

        <Button loading={isLoading} type="submit" colorPalette={"purple"}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
