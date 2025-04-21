import { Box } from "@chakra-ui/react";

export function Syllabus({ syllabus }: { syllabus?: string | null }) {
  return (
    syllabus && (
      <Box asChild w="full" h="2xl">
        <object title="Syllabus" data={syllabus} type="application/pdf">
          <Box asChild w="full" h="xl">
            <iframe title={"Syllabus"} loading="lazy" src={syllabus} />
          </Box>
        </object>
      </Box>
    )
  );
}
