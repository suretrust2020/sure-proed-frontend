import { Button, Heading, List, Text } from "@chakra-ui/react";
import {
  DialogActionTrigger,
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
import type { GuidelinesType } from "./types";

export default function Guidelines({
  footerText,
  headerText,
  lists,
  title,
}: GuidelinesType) {
  return (
    <DialogRoot placement={"center"} motionPreset="slide-in-top" size={"lg"}>
      <DialogTrigger asChild>
        <Button variant={"surface"} size="lg">
          Read Guidelines
        </Button>
      </DialogTrigger>
      <DialogBackdrop
        backdropFilter="blur(10px)" // Adjust blur intensity as needed
        background="rgba(0, 0, 0, 0.3)" // Optional: Adds a slight overlay effect
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>{headerText}</Text>
          <List.Root
            listStyleType={"none"}
            variant={"marker"}
            as={"ol"}
            gap={4}
            my={4}
          >
            {lists.map((item) => (
              <List.Item key={item.title}>
                <Heading as={"h4"} fontSize={"md"}>
                  {item.title}
                </Heading>
                <Text>{item.content}</Text>
              </List.Item>
            ))}
          </List.Root>
          <Text>{footerText}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
