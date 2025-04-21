import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaEye } from "react-icons/fa";

export default function NoticeModal({ notice }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Open"
        onClick={onOpen}
        size={"xs"}
        rounded="full"
        variant="ghost"
        colorScheme="whiteAlpha"
        icon={
          <ArrowRightIcon
            color={useColorModeValue("purple.50", "purple.900")}
            size={16}
          />
        }
      />

      <Modal
        allowPinchZoom
        orientation="vertical"
        onClose={onClose}
        isOpen={isOpen}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align={"start"}>
              <Heading fontSize={"lg"}>{notice.title}</Heading>
              <Text wordBreak={"break-word"}>{notice.description}</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
