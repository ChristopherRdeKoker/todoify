import { AuthError, type NextAuthConfig, type User } from "next-auth";
import { findUserByUsername } from "./action";
import { LoginSchema } from "@/api/login/loginSchema";
import CredentialProvider from "next-auth/providers/credentials";
import { ActionValidationError } from "next-safe-action";

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof AuthError) {
    message = error.cause?.err?.message ?? "";
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String((error as any).message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export default {
  providers: [
    CredentialProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, request) {
        let user: User | null = null;
        try {
          const parsedData = LoginSchema.safeParse(credentials);
          if (!parsedData.success) {
            throw new Error("Invalid credentials format");
          }

          const userQuery = await findUserByUsername({
            username: parsedData?.data?.username ?? "",
          });
          if (!userQuery?.data?.id || userQuery.serverError) {
            throw new Error("No user found");
          }

          const isPWMatch = userQuery?.data?.password.toLowerCase() === parsedData?.data?.password?.toLowerCase();
          if (!isPWMatch) {
            throw new Error("Passwords do not match");
          }

          user = {
            isParent: userQuery?.data?.is_parent ?? false,
            email: userQuery?.data?.username,
            id: userQuery?.data?.id?.toString(),
            image: null,
            name: userQuery?.data?.name,
          };

          return user;
        } catch (error) {
          // Log the error for debugging
          // console.error("Authorization error:", error);
          throw new Error(getErrorMessage(error));

          // Return null or handle as necessary
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
