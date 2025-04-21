import { Button, HStack, Text } from "@chakra-ui/react";
import { parseAsString, useQueryState } from "nuqs";
import { Link, redirect, useActionData } from "react-router";
import { AccountDetails } from "./steps/account-details";
import { PersonalDetails } from "./steps/personal-details";
import { CollegeDetails } from "./steps/college-details";
import { CourseDetails } from "./steps/course-details";
import { TermsConditions } from "./steps/terms-conditions";
import { fetchAllCourses } from "@/repositories/courses";
import type { Route } from "./+types/page";
import { SignupProvider } from "./signup-provider";
import { signup } from "@/repositories/auth";
import { toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import type { SignupSchema } from "./schema";

export default function SignupPage({ loaderData }: Route.ComponentProps) {
  const [step, setStep] = useQueryState(
    "step",
    parseAsString.withDefault("account-details")
  );

  const currentIndex = steps.findIndex((s) => s.id === step);
  const CurrentComponent = steps[currentIndex]?.Component;
  const data = useActionData();

  useEffect(() => {
    if (data) {
      toaster.create({
        title: data.success ? "Success" : "Error",
        type: data.success ? "success" : "error",
        description: data.message ?? "Something went wrong",
      });
    }
  }, [data]);

  return (
    <SignupProvider>
      <HStack mb={4} justify={"space-between"}>
        <Text fontWeight={"medium"} fontSize={"sm"} color={"fg.muted"}>
          Step {currentIndex + 1} of {steps.length}
        </Text>
        <Button asChild size="sm" variant="subtle" colorPalette="purple">
          <Link to="/login">Login</Link>
        </Button>
      </HStack>

      {CurrentComponent && (
        <CurrentComponent
          {...(currentIndex > 0 && {
            onPrev: () => {
              setStep(steps[currentIndex - 1].id);
            },
          })}
          {...(currentIndex < steps.length - 1 && {
            onNext: () => {
              setStep(steps[currentIndex + 1].id);
            },
          })}
          {...(step === "course-details" && {
            coursePromise: loaderData.coursesPromise,
          })}
        />
      )}
    </SignupProvider>
  );
}

export async function loader() {
  const courses = fetchAllCourses();
  return {
    coursesPromise: courses,
  };
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData) as unknown as SignupSchema;
    const payload = {
      ...rawData,
      course_id: rawData.course_id[0],
    };
    const resp = await signup(payload);
    if (resp.success) {
      return redirect("/login");
    }
    return resp;
  } catch (error: any) {
    console.log(error);
    return {
      errors: error?.response?.errors || { general: ["Something went wrong"] },
    };
  }
}

const steps = [
  { id: "account-details", Component: AccountDetails },
  { id: "personal-details", Component: PersonalDetails },
  { id: "college-details", Component: CollegeDetails },
  { id: "course-details", Component: CourseDetails },
  { id: "terms-conditions", Component: TermsConditions },
];
