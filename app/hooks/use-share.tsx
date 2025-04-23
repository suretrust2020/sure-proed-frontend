import { toaster } from "@/components/ui/toaster";

export const useShare = () => {
  const handleShare = async ({
    title,
    text,
    url,
  }: {
    title: string;
    text: string;
    url: string;
  }) => {
    const shareData = { title, text, url };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toaster.create({
          description: "Copied to clipboard!",
          type: "success",
          closable: true,
        });
      } else {
        toaster.create({
          description: "Sharing not supported on this device.",
          type: "error",
          closable: true,
        });
      }
    } catch (err: any) {
      console.error("Share failed:", err);
      toaster.create({
        description: err.message || "Something went wrong.",
        type: "info",
        closable: true,
      });
    }
  };

  return handleShare;
};
