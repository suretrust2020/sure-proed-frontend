import {
  Button,
  Container,
  Field,
  GridItem,
  Input,
  Show,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { SelectCourse } from "@/components/select-course";
import type { Route } from "./+types/page";
import { fetchAllCourses } from "@/repositories/courses";
import { PlusIcon } from "lucide-react";
import { SelectRoles } from "./select-roles";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BatchInput } from "./batch-input";
import { EmploymentInput } from "./employment-input";
import { roleValues } from "../config";
import { redirect, useActionData, useSubmit } from "react-router";
import { createSuccessStory } from "@/repositories/success-story";
import type { SuccessStoryType } from "@/lib/mongodb/models/success-story";

const formSchema = z.object({
  role: z.enum(roleValues, {
    errorMap: () => ({ message: "Role is required and must be valid" }),
  }),
  batch: z.string({ message: "Batch is required" }).optional(),
  employed: z.boolean().default(false),
  designation: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  name: z.string().min(1, "Name is required"),
  trainer: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePage({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const actionData = useActionData();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isLoading },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batch: "",
      designation: "",
      company: "",
      trainer: "",
      employed: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    await submit(data, {
      method: "post",
    });
  });

  const role = watch("role");
  const employed = watch("employed");

  return (
    <Container maxW={"2xl"}>
      {JSON.stringify(actionData, null, 4)}
      <form onSubmit={onSubmit}>
        <SimpleGrid columns={[1, 1, 2]} gap={4}>
          <GridItem colSpan={2}>
            <Field.Root colorPalette={"purple"} invalid={!!errors.name}>
              <Field.Label>Name</Field.Label>
              <Input {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>
          </GridItem>
          <GridItem colSpan={2}>
            <SelectRoles control={control} error={errors.role?.message} />
          </GridItem>

          <Show when={role !== "admirer"}>
            <GridItem colSpan={2}>
              <Field.Root colorPalette={"purple"}>
                <Field.Label>Course</Field.Label>
                <SelectCourse courses={loaderData.courses} />
              </Field.Root>
            </GridItem>
          </Show>

          <Show when={role === "student"}>
            <GridItem>
              <Field.Root colorPalette={"purple"}>
                <Field.Label>Trainer</Field.Label>
                <Input {...register("trainer")} />
              </Field.Root>
            </GridItem>

            <GridItem>
              <BatchInput control={control} error={errors.batch?.message} />
            </GridItem>
          </Show>

          <GridItem colSpan={2}>
            <EmploymentInput
              control={control}
              error={errors.employed?.message}
            />
          </GridItem>
          <Show when={employed}>
            <GridItem>
              <Field.Root
                colorPalette={"purple"}
                invalid={!!errors.designation}
              >
                <Field.Label>Current designation</Field.Label>
                <Input {...register("designation")} />
                <Field.ErrorText>{errors.designation?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root colorPalette={"purple"} invalid={!!errors.company}>
                <Field.Label>Current company</Field.Label>
                <Input {...register("company")} />
              </Field.Root>
            </GridItem>
          </Show>

          <GridItem colSpan={2}>
            <Field.Root colorPalette={"purple"} invalid={!!errors.content}>
              <Field.Label>
                {role === "admirer"
                  ? "How SURE trust has empowered you ?"
                  : "What draws your attention to SURE trust"}
              </Field.Label>
              <Textarea
                size={"lg"}
                autoresize
                minH={"30vh"}
                {...register("content")}
              />
              <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
            </Field.Root>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              w={"full"}
              type="submit"
              colorPalette="purple"
              loading={isLoading}
            >
              <PlusIcon />
              Submit
            </Button>
          </GridItem>
        </SimpleGrid>
      </form>
    </Container>
  );
}

export async function loader() {
  const courses = await fetchAllCourses();

  return {
    courses,
  };
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData);

    const input = {
      ...entries,
      employed: entries.employed === "true",
    } as SuccessStoryType;

    const data = await createSuccessStory(input);
    if (!data) {
      return {
        errors: "Failed to create success story try again...",
      };
    }
    return redirect(`/success-stories/${data._id}`);
  } catch (error: any) {
    return {
      errors: error?.message || "Something went wrong",
    };
  }
}
