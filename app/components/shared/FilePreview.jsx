import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function FilePreview({ file, setFile }) {
  return (
    <Modal
      allowPinchZoom
      orientation="vertical"
      onClose={() => setFile(null)}
      isOpen={file}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt={12} as="object" w="100%" h="70vh" data={file}>
            <Box as="iframe" src={file} w="full" h="70vh" loading="lazy"></Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setFile(null)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
