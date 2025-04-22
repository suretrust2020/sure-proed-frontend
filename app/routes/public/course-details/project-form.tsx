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
import { useEffect } from "react";
import { ProjectPreview } from "./project-preview";
import { XIcon } from "lucide-react";

const projectSchema = z.object({
  repoUrl: z.string().url(),
});

type ProjectSchema = z.infer<typeof projectSchema>;

export function ProjectForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const params = useParams();
  const data = useActionData();
  const isLoading =
    navigation.state !== "idle" &&
    navigation.formAction?.includes(`/courses/${params.courseId}`) &&
    navigation.formData?.get("intent") === "project-submit";

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      repoUrl: "",
    },
  });

  const repoUrl = watch("repoUrl");

  useEffect(() => {
    submit(
      {
        repoUrl,
        intent: "project-preview",
      },
      {
        method: "POST",
      }
    );
  }, [repoUrl]);

  async function onSubmit({ repoUrl }: ProjectSchema) {
    await submit(
      {
        repoUrl,
        intent: "project-submit",
        courseId: params.courseId as string,
      },
      {
        method: "POST",
      }
    );
    reset();
    onFormSubmit();
  }

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4">
        <Field.Root colorPalette={"purple"} invalid={!!errors.repoUrl}>
          <Field.Label>Paste project url</Field.Label>
          <HStack w="full">
            <Input w="full" flex={1} {...register("repoUrl")} />
            {data?.projectPreview?.data && (
              <IconButton
                onClick={() => reset()}
                variant={"outline"}
                aria-label="Clear"
              >
                <XIcon />
              </IconButton>
            )}
          </HStack>
          <Field.ErrorText>{errors.repoUrl?.message}</Field.ErrorText>
        </Field.Root>
        {data?.projectPreview?.data && (
          <Box my={4}>
            <ProjectPreview data={data.projectPreview.data} />
          </Box>
        )}
        <Button loading={isLoading} type="submit" colorPalette={"purple"}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
