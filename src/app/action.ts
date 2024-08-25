"use server";

import { z } from "zod";
import prisma from "../../database/prisma/prisma";
import { LoginSchema } from "@/api/login/loginSchema";

export async function loginMutation(input: z.infer<typeof LoginSchema>) {
  try {
    const user = await prisma.account_user.findFirst({
      where: {
        email: {
          contains: input?.username?.toLowerCase(),
        },
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const passwordMatch = input.password?.toLowerCase() == user.password?.toLowerCase();
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    const safeUser = {
      id: user?.id,
      name: user?.name,
    };

    return { success: true, user: safeUser };
  } catch (err) {
    console.log(err);
    return { error: "An unexpected error occurred" };
  }
}
