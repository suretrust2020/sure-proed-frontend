import {
  Box,
  Button,
  Card,
  FileUpload,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  useFileUploadContext,
  type FileUploadFileAcceptDetails,
  type FileUploadFileRejectDetails,
} from "@chakra-ui/react";
import { UploadIcon, XIcon } from "lucide-react";
import { toaster } from "./ui/toaster";
import { useFetcher } from "react-router";
import { useEffect } from "react";

const errorMessages: Record<string, string> = {
  FILE_TOO_LARGE: "One or more images are too large.",
  FILE_INVALID_TYPE: "One or more files are not valid image formats.",
  FILE_REQUIRED: "Please select an image to upload.",
};

export function ImageUpload({
  onUpload,
  limit = 3,
}: {
  onUpload: (images: any[]) => void;
  limit?: number;
}) {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    onUpload(fetcher.data);
  }, [fetcher.data]);

  function handleFileUpload(details: FileUploadFileAcceptDetails) {
    const formData = new FormData();
    details.files.forEach((file) => {
      if (file) {
        formData.append("files[]", file);
      }
    });
    fetcher.submit(formData, {
      method: "post",
      action: "/api/cloudinary",
      encType: "multipart/form-data",
    });
  }
  function handleFileReject(details: FileUploadFileRejectDetails) {
    const userFriendlyErrors = details.files
      .flatMap((file) => file.errors)
      .map((errorCode) => errorMessages[errorCode] || "Unknown error.")
      .join(" ");

    if (userFriendlyErrors.length) {
      toaster.error({
        closable: true,
        title: "Image upload failed",
        description: userFriendlyErrors,
      });
    }
  }
  return (
    <FileUpload.Root
      w="full"
      alignItems="stretch"
      maxFiles={limit}
      maxFileSize={1 * 1024 * 1024}
      accept={"image/*"}
      onFileReject={handleFileReject}
      onFileAccept={handleFileUpload}
      disabled={busy}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        {!busy ? (
          <Icon size="md" color="fg.muted">
            <UploadIcon />
          </Icon>
        ) : (
          <Spinner size={"md"} color={"fg.muted"} />
        )}
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">.png, .jpg up to 1MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUploadList data={fetcher.data} />
    </FileUpload.Root>
  );
}

const FileUploadList = ({ data }: { data: any[] }) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  if (files.length === 0 && (!data || data.length === 0)) return null;

  return (
    <SimpleGrid gap={4} columns={[1, 2]}>
      {data?.length
        ? data.map((img) => (
            <Card.Root size={"sm"}>
              <Image
                src={img.url}
                alt="Uploaded preview"
                objectFit="cover"
                rounded="md"
                width={"full"}
                height={"24"}
              />
              <Card.Body></Card.Body>
              <Card.Footer>
                <Button
                  size="xs"
                  aria-label="Delete image"
                  colorPalette="red"
                  onClick={() => {}}
                  variant={"ghost"}
                >
                  <XIcon size={12} />
                  Delete
                </Button>
              </Card.Footer>
            </Card.Root>
          ))
        : null}
    </SimpleGrid>
  );
};
