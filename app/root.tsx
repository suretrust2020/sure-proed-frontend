import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Providers } from "@/providers";
import ErrorPage from "./components/error-page";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = 500;
  let statusText = "";
  let message = "";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    statusText = error.statusText;
    message =
      error.status === 404
        ? `Oops! Looks like this lesson or page has gone on a little adventure and can't be found. Please check the URL or head back to our  to explore more learning resources!`
        : `Oh no! Our servers are having a tough time keeping up with your learning enthusiasm. We're working to fix this issue. Please try again in a few minutes or contact our  for assistance.`;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    statusText = error.message;
    stack = error.stack;
  }

  return (
    <Providers>
      <ErrorPage status={status} statusText={statusText} message={message} />

      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </Providers>
  );
}
