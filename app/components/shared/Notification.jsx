import { IconButton } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

function Notification() {
  return (
    <>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
      />
    </>
  );
}

export default Notification;
