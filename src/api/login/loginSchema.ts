import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3, { message: "Please add at least 3 characters" }),
  password: z.string().min(3, { message: "Please add at least 3 characters" }),
});

export const LoginDefaultValues: z.infer<typeof LoginSchema> = {
  username: "",
  password: "",
};
