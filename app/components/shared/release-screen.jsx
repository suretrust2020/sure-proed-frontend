import {
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect } from "react";

export function ReleaseScreen({ onComplete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(30deg)"
        />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Release Volunteer Page</ModalHeader>

          <ModalBody mb={4} display={"flex"} justifyContent={"center"}>
            <Button
              onClick={() => {
                onClose();
                onComplete();
              }}
              variant="solid"
              colorScheme="blue"
              size="lg"
            >
              Release
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
