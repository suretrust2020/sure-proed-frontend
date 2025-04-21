import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import useCloudinary from "../../../hooks/useCloudinary";
import ImagePreview from "./ImagePreview";
export default function ImageUpload({ images, setImages }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const inputRef = useRef();
  const { uploadToCloud, uploading } = useCloudinary();
  const [error, setError] = useState("");

  const handleImageChange = async (e) => {
    const imageFiles = e.target.files;

    const size = imageFiles.size;
    if (size > 1 * 1000000) {
      setError("File size must be less than 1 mb");
      return;
    }

    for await (let imageFile of imageFiles) {
      const data = await uploadToCloud(imageFile);
      setImages((images) => [
        ...images,
        { url: data.url, publicId: data.public_id },
      ]);
    }
    toast({
      status: "success",
      title: "Image upload",
      description: "Image uploaded successfully",
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        title="Upload image"
        colorScheme="whatsapp"
        variant="ghost"
        leftIcon={<BsImages size={20} />}
        onClick={onOpen}
      >
        Upload image
      </Button>

      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              isLoading={uploading}
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              leftIcon={<BsImages size={24} />}
              colorScheme="whatsapp"
              mt={4}
            >
              Choose Image
            </Button>

            <VisuallyHidden>
              <input
                accept="image/*"
                type={"file"}
                onChange={handleImageChange}
                ref={inputRef}
                multiple
              />
            </VisuallyHidden>
            <Box my={"2"}>
              {images.length ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={"4"}>
                  {images.map((image) => (
                    <ImagePreview image={image} setImages={setImages} />
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign={"center"}>No images</Text>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
