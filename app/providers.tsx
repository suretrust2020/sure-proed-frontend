import { Provider as ChakraProvider } from "@/components/ui/provider";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Analytics } from "@vercel/analytics/react";
import { AuthStoreProvider } from "./providers/auth-store-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <Analytics />
      <AuthStoreProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </AuthStoreProvider>
    </NuqsAdapter>
  );
}
