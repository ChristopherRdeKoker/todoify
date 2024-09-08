"use server";

import prisma from "../../../../database/prisma/prisma";
import { z } from "zod";
import { safeAction } from "@/app/api/createSafeAction/createSafeAction";

export const getUserQuery = safeAction.schema(z.coerce.number()).action(async ({ parsedInput }) => {
  const userId = parsedInput;

  const userQuery = await prisma.account_user?.findFirst({
    where: {
      id: +(userId ?? 0),
    },
  });
  if (!userQuery) {
    return { error: "No user data found" };
  }

  const { password, username, ...safeQuery } = userQuery;

  return {
    success: true,
    userQuery: safeQuery,
  };
});
