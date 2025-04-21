import { Box, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { RiCloseLine } from "react-icons/ri";
import useCloudinary from "../../../hooks/useCloudinary";

export default function ImagePreview({ image, setImages }) {
  const { removeImage, removing } = useCloudinary();
  const handleRemoveImage = async () => {
    await removeImage(image.publicId);
    setImages((images) => images.filter((i) => i.publicId !== image.publicId));
  };
  return (
    <Box pos="relative">
      <Image rounded="md" src={image.url} w={"full"} h={"40"} objectFit="cover" />

      <Box pos={"absolute"} top={"2"} right={"2"}>
        <Tooltip label="Remove image">
          <IconButton
            isLoading={removing}
            rounded="full"
            colorScheme={"red"}
            size="sm"
            icon={<RiCloseLine size={20} />}
            aria-label="remove-image"
            onClick={handleRemoveImage}
            disabled={removing}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
