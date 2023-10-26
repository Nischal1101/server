import { z } from "zod";
const authSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "Username is required field",
      })
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  }),
});
export default authSchema;
