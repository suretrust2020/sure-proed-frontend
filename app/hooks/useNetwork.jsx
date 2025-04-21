import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function useNetwork() {
  const [isOnline, setIsOnline] = useState(false);
  const toast = useToast();

  function checkNetworkStatus() {
    const isOnline = window.navigator?.onLine;
    setIsOnline(isOnline);
  }
  function handleStatusChange(e) {
    const isOnline = e.type === "online";
    setIsOnline(isOnline);
    toast({
      status: isOnline ? "success" : "warning",
      title: "Network Status",
      description: isOnline ? "You are Online" : "You are offline",
      isClosable: true,
      duration: 6000,
    });
  }
  useEffect(() => {
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    checkNetworkStatus();

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isOnline,
  };
}
