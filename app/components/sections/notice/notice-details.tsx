import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogBackdrop,
} from "@/components/ui/dialog";
import { ArrowRightIcon } from "@/lib/icons";
import type { NoticeType } from "@/lib/types";
import { Alert, Box, IconButton, Text } from "@chakra-ui/react";

export function NoticeDetails({ title, description }: NoticeType) {
  return (
    <DialogRoot>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          rounded={"none"}
          userSelect={"none"}
          cursor={"pointer"}
          py={3}
          bgClip="border-box"
          color={"white"}
        >
          <Text
            lineClamp={1}
            textAlign={"center"}
            fontWeight={"medium"}
            fontSize={"sm"}
          >
            {title}
          </Text>
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>{description}</Text>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
