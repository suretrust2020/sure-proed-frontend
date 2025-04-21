import { HStack, Text, useColorModeValue, Box } from "@chakra-ui/react";
import NoticeModal from "./NoticeModal";

export default function ScrollText({ notice }) {
  return (
    <HStack spacing={2} justify={"center"} align={["start", "center"]} px="2">
      <Box
        as="svg"
        color={useColorModeValue("purple.50", "purple.900")}
        data-ux="SVG"
        viewBox=" 0 0 35 35"
        dataaids="SEASONAL_WINTER_LEFT_ICON_RENDERED"
        style={{ width: "20px", height: "20px", flex: "none" }}
      >
        <g stroke="currentColor" fill="none" fillRule="evenodd">
          <path d="M16.724 10.726l4.651 5.349M12.03 16.408L16.8 21.8M16.8 1.8v28M30.8 16.3h-28M15.8 1.3a1 1 0 1 1 1.999 0 1 1 0 0 1-2 0zM30.3 16.3a1 1 0 1 1 1.999 0 1 1 0 0 1-2 0zM1.3 16.3a1 1 0 1 1 1.999 0 1 1 0 0 1-2 0zM15.8 30.8a1 1 0 1 1 1.999 0 1 1 0 0 1-2 0zM23.05 10.05l-12.5 12.5M22.6 9.3a1 1 0 1 1 1.999-.002A1 1 0 0 1 22.6 9.3zM8.8 23.3a1 1 0 1 1 1.999 0 1 1 0 0 1-2 0zM16.99 5.545l10.02 10.961M17 27.3l-10.7-11M27.01 16.131l-10.02 10.96M6.59 17.091l10.02-10.96M22.925 22.086L10.688 9.328M22.459 22.826a1 1 0 1 0 2 .043 1 1 0 0 0-2-.043zM8.953 8.542a1.001 1.001 0 1 0 2.002.04 1.001 1.001 0 0 0-2.002-.04z"></path>
        </g>
      </Box>

      <Text
        fontSize={"md"}
        fontWeight={"bold"}
        color={useColorModeValue("purple.50", "purple.900")}
      >
        {notice.title}
      </Text>
      <NoticeModal notice={notice} />
    </HStack>
  );
}
