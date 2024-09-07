"use server";

import prisma from "../../database/prisma/prisma";
import { LoginSchema } from "@/api/login/loginSchema";
import { safeAction } from "./api/createSafeAction/createSafeAction";
import { signIn } from "./auth";
import { getErrorMessage } from "../app/auth.config";

import { redirect } from "next/navigation";
import { ActionValidationError } from "next-safe-action";

export const findUserByUsername = safeAction
  .schema(
    LoginSchema.pick({
      username: true,
    })
  )
  .action(async ({ parsedInput }) => {
    const user = await prisma.account_user.findFirst({
      include: {
        account_user_role: {
          select: {
            account_role: {
              select: {
                role: true,
                id: true,
              },
            },
          },
        },
      },
      where: {
        username: {
          equals: parsedInput?.username,
          mode: "insensitive",
        },
      },
    });
    return user;
  });

export const LoginHandler = safeAction.schema(LoginSchema).action(async ({ parsedInput }) => {
  try {
    const response = await signIn("credentials", { ...parsedInput, redirect: false });
    if (!response || response?.error) {
      throw new ActionValidationError(response?.error || "no response in loginHandler");
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  redirect("/homepage");
});
