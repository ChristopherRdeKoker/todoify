"use server";

import { z } from "zod";
// import prisma from "../../../../database/prisma/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { createToDoSchema } from "@/api/createTodo/createTodoSchema";

export async function getAllUserOptions(userId: number) {
  try {
    const rawUsers = await prisma.account_user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: {
          not: userId,
        },
      },
    });
    //remove user from list
    const result = rawUsers?.map((i) => ({ text: i?.name, value: i?.id?.toString() }));
    return {
      result,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "An unexpected error occurred",
    };
  }
}

export async function createToDoItem(formData: z.infer<typeof createToDoSchema>) {
  try {
    return { message: "not implemented in actions yet, cant bypass ID when creating" };
    // const result = await prisma.to_do_item.create({
    //   data: {
    //     is_complete: false,
    //     is_urgent: formData?.isUrgent,
    //     title: formData?.title,
    //     created_by: formData?.createdBy,
    //     created_for: +(formData?.intendedFor?.value ?? 0),
    //   },
    //   select: {
    //     id: false,
    //   },
    // });
    ////////////////////////////////
    //   data: {
    //     is_complete: false,
    //     is_urgent: formData?.isUrgent ?? false,
    //     title: formData?.title ?? "",
    //     created_by: formData?.createdBy ?? 0,
    //     created_for: +(formData?.intendedFor?.value ?? 0),
    //   },
    //   create: {
    //     is_complete: false,
    //     is_urgent: formData?.isUrgent ?? false,
    //     title: formData?.title ?? "",
    //     created_by: formData?.createdBy ?? 0,
    //     created_for: +(formData?.intendedFor?.value ?? 0),
    //   },
    // });
    // const result = await prisma.to_do_item.create({
    //   data:
    // })
  } catch (error) {
    console.log(error);
    return {
      error: "An unexpected error occurred",
    };
  }
}
