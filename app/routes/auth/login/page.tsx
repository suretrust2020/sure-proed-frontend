import { Button, Card, HStack } from "@chakra-ui/react";
import { Link, redirect } from "react-router";
import { SITE_NAME } from "@/lib/constant";
import type { Route } from "./+types/page";
import { env } from "@/lib/env";

import { login } from "@/repositories/auth";
import { LoginForm } from "./login-form";
import { commitSession, getSession } from "@/session.server";

export default function LoginPage() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
      </Card.Header>
      <Card.Body>
        <LoginForm />
      </Card.Body>
      <Card.Footer>
        <HStack>
          <Button variant="ghost" asChild size="sm">
            <Link to="/signup"> Not have an account ? Sign up</Link>
          </Button>
          <Button variant="ghost" asChild size="sm">
            <a target={"_blank"} href={`${env.BASEURL}/users/reset_password/`}>
              Forgotton password
            </a>
          </Button>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData.entries());
  const resp = await login(formObject);

  if (resp.success) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("user_id", resp.data?.user_id);
    session.set("token", resp.data?.token);
    session.set("regno", resp.data?.regno);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return resp;
}

export function meta() {
  return [{ title: `Login | ${SITE_NAME}` }];
}
