import { z } from "zod";
import { REGEX } from "../configs/constants";

export const GetCurrentUserSchema = z.object({
  id: z.number().int(),
  firstName: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be string",
    })
    .trim()
    .regex(REGEX.name, "Firstname is not valid"),
  lastName: z
    .string({
      invalid_type_error: "Lastname must be string",
    })
    .trim()
    .regex(REGEX.name, "Lastname is not valid")
    .nullable(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .trim()
    .regex(REGEX.email, "Email is not valid"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type GetCurrentUserType = z.infer<typeof GetCurrentUserSchema>;
