import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActionData,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router";
import {
  Box,
  Button,
  Field,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { XIcon } from "lucide-react";
import { ProjectPreview } from "./project-preview";
import debounce from "lodash.debounce";

const projectSchema = z.object({
  repoUrl: z.string().url("Please enter a valid URL"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const params = useParams();
  const data = useActionData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { repoUrl: "" },
  });

  const repoUrl = watch("repoUrl");

  const isLoading =
    navigation.state !== "idle" &&
    navigation.formAction?.includes(`/courses/${params.courseId}`) &&
    navigation.formData?.get("intent") === "project-submit";

  // Debounced preview submission for better performance
  const debouncedPreview = debounce((url: string) => {
    submit({ repoUrl: url, intent: "project-preview" }, { method: "POST" });
  }, 500);

  useEffect(() => {
    if (repoUrl) debouncedPreview(repoUrl);
    return () => debouncedPreview.cancel();
  }, [repoUrl]);

  const onSubmit = (values: ProjectFormValues) => {
    submit(
      {
        repoUrl: values.repoUrl,
        intent: "project-submit",
        courseId: params.courseId as string,
      },
      { method: "POST" }
    );
    reset();
    onFormSubmit();
  };

  const hasPreviewError =
    !!errors.repoUrl || data?.projectPreview?.success === false;

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Field.Root colorPalette="purple" invalid={hasPreviewError}>
          <Field.Label htmlFor="repoUrl">Paste GitHub project URL</Field.Label>
          <HStack w="full">
            <Input
              id="repoUrl"
              placeholder="https://github.com/username/repo"
              {...register("repoUrl")}
            />
            {data?.projectPreview?.data && (
              <IconButton
                onClick={() => reset()}
                variant="outline"
                aria-label="Clear input"
              >
                <XIcon />
              </IconButton>
            )}
          </HStack>
          <Field.ErrorText>
            {errors.repoUrl?.message || data?.projectPreview?.message}
          </Field.ErrorText>
        </Field.Root>

        {data?.projectPreview?.data && (
          <Box my={4}>
            <ProjectPreview data={data.projectPreview.data} />
          </Box>
        )}

        <Button
          type="submit"
          colorPalette="purple"
          loading={isLoading}
          loadingText="Submitting"
        >
          Submit Project
        </Button>
      </Stack>
    </form>
  );
}
