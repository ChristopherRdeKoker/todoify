"use server";

import prisma from "../../../../database/prisma/prisma";

export async function getUserQuery(input: number) {
  try {
    const userQuery = await prisma.account_user?.findFirst({
      where: {
        id: +(input ?? 0),
      },
    });
    if (!userQuery) {
      return { error: "No user data found" };
    }

    // let isParent =
    return {
      success: true,
      userQuery,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "An unexpected error occurred",
    };
  }
}
