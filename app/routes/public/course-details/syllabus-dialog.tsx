import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export function SyllabusDialog({
  courseName,
  syllabus,
}: {
  courseName: string;
  syllabus?: string | null;
}) {
  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Syllabus
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{courseName} Syllabus</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              {syllabus && (
                <Box asChild w="full" h="full">
                  <object
                    title="Syllabus"
                    data={syllabus}
                    type="application/pdf"
                  >
                    <Box asChild w="full" h="full">
                      <iframe
                        title={"Syllabus"}
                        loading="lazy"
                        src={syllabus}
                      />
                    </Box>
                  </object>
                </Box>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
