import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string(),

  fullName: z.string().min(1, { message: "Full name is required" }).max(100),

  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 digits" })
    .max(15)
    .regex(/^[0-9]+$/, { message: "Phone must contain only numbers" }),

  qualification: z.string().min(1, { message: "Qualifications are required" }),

  gender: z
    .string({ message: "Gender are required" })
    .min(1, { message: "Gender are required" }),

  college_name: z.string().min(1, { message: "College name is required" }),
  college_place: z.string().min(1, { message: "College place is required" }),
  college_district: z
    .string()
    .min(1, { message: "College district is required" }),
  college_state: z.string().min(1, { message: "College state is required" }),

  course_id: z
    .array(z.string().min(1, "Cours can't be empty"))
    .min(1, { message: "Course must be selected" }),

  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
