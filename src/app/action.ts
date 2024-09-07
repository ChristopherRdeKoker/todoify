"use server";

import { z } from "zod";
import prisma from "../../database/prisma/prisma";
import { LoginSchema } from "@/api/login/loginSchema";
import { safeAction } from "./api/createSafeAction/createSafeAction";
import { auth, signIn } from "./auth";
import authConfig, { getErrorMessage } from "../app/auth.config";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { ActionValidationError } from "next-safe-action";

export const findUserByUsername = safeAction
  .schema(
    LoginSchema.pick({
      username: true,
    })
  )
  .action(async ({ parsedInput }) => {
    const user = await prisma.account_user.findFirst({
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
    // return response;
  } catch (error) {
    // console.log("11");
    // console.log(error);

    // if (error instanceof ActionValidationError) {
    //   return error;
    // }
    // throw new ActionValidationError("An unknown error occurred <BE LoginHandler>");
    return {
      error: getErrorMessage(error),
    };
  }
  redirect("/homepage");
});
