"use server";

import prisma from "../../database/prisma/prisma";

export async function getLoginUsers() {
  try {
    const result = await prisma.account_user.findMany();
    return {
      result,
    };
  } catch (err) {
    return { error: "Failed login query" };
  }
}
