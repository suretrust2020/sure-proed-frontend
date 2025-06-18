import {
  Box,
  Button,
  Container,
  Field,
  GridItem,
  Input,
  Show,
  SimpleGrid,
  Text,
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
import {
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router";
import { createSuccessStory } from "@/repositories/success-story";

const formSchema = z.object({
  role: z.enum(roleValues, {
    errorMap: () => ({ message: "Please select your role in SURE Trust" }),
  }),
  batch: z.string({ message: "Please enter your batch" }).optional(),
  employed: z.boolean().default(false),
  designation: z.string().optional(),
  company: z.string().optional(),
  content: z
    .string()
    .min(1, "This field is required. Please share your story or feedback."),
  name: z.string().min(1, "Please enter your name."),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL (starting with http/https)"),

  trainer: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePage({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();

  const busy = navigation.formAction === "/success-stories/create";

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batch: "",
      designation: "",
      company: "",
      trainer: "",
      employed: false,
      linkedin: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await submit(data, {
      method: "post",
    });
  });

  const role = watch("role");
  const employed = watch("employed");

  return (
    <Container maxW="2xl">
      {actionData?.errors && (
        <Box
          mb={4}
          p={4}
          bg="red.50"
          border="1px solid"
          borderColor="red.200"
          borderRadius="md"
        >
          <Text color="red.600" fontWeight="medium">
            {actionData.errors}
          </Text>
        </Box>
      )}

      <form onSubmit={onSubmit}>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <GridItem colSpan={2}>
            <Field.Root colorPalette="purple" invalid={!!errors.name}>
              <Field.Label>Name</Field.Label>
              <Input placeholder="Enter your full name" {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>
          </GridItem>

          <GridItem colSpan={2}>
            <Field.Root colorPalette="purple" invalid={!!errors.linkedin}>
              <Field.Label>LinkedIn Profile</Field.Label>
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                {...register("linkedin")}
              />
              <Field.ErrorText>{errors.linkedin?.message}</Field.ErrorText>
            </Field.Root>
          </GridItem>

          <GridItem colSpan={2}>
            <SelectRoles control={control} error={errors.role?.message} />
          </GridItem>

          <Show when={role !== "admirer"}>
            <GridItem colSpan={2}>
              <Field.Root colorPalette="purple">
                <Field.Label>Course</Field.Label>
                <SelectCourse courses={loaderData.courses} />
              </Field.Root>
            </GridItem>
          </Show>

          <Show when={role === "student"}>
            <GridItem>
              <Field.Root colorPalette="purple">
                <Field.Label>
                  Trainer{" "}
                  <Text as="span" color="gray.500">
                    (optional)
                  </Text>
                </Field.Label>
                <Input
                  placeholder="Enter your trainer’s name"
                  {...register("trainer")}
                />
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
              <Field.Root colorPalette="purple" invalid={!!errors.designation}>
                <Field.Label>Current Designation</Field.Label>
                <Input
                  placeholder="e.g., Software Engineer"
                  {...register("designation")}
                />
                <Field.ErrorText>{errors.designation?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>

            <GridItem>
              <Field.Root colorPalette="purple" invalid={!!errors.company}>
                <Field.Label>Current Company</Field.Label>
                <Input placeholder="e.g., Infosys" {...register("company")} />
                <Field.ErrorText>{errors.company?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
          </Show>

          <GridItem colSpan={2}>
            <Field.Root colorPalette="purple" invalid={!!errors.content}>
              <Field.Label>
                {role === "admirer"
                  ? "How has SURE Trust empowered you?"
                  : "What stands out to you about SURE Trust?"}
              </Field.Label>
              <Textarea
                minH="30vh"
                placeholder="Write your story or feedback here..."
                {...register("content")}
                minLength={30}
              />

              <Show when={!errors.content?.message}>
                <Field.HelperText>
                  Minimum 30 words recommended for better visibility.
                </Field.HelperText>
              </Show>

              <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
            </Field.Root>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              w="full"
              type="submit"
              colorPalette="purple"
              loading={busy}
              loadingText="Submitting..."
            >
              <PlusIcon />
              &nbsp;Submit Your Story
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
    const entries = Object.fromEntries(formData.entries());

    // Convert string values to expected types
    const rawInput = {
      ...entries,
      employed: entries.employed === "true",
    } as any;

    const data = await createSuccessStory(rawInput);

    if (!data) {
      return {
        errors: "Failed to submit your story. Please try again shortly.",
      };
    }

    return redirect(`/success-stories/${data._id}`);
  } catch (error: any) {
    console.error("Action error:", error);
    return {
      errors:
        error?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
}
