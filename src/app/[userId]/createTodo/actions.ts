"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createToDoSchema } from "@/api/createTodo/createTodoSchema";
import { actionClient } from "@/api/safe-actions/safe-action";

const prisma = new PrismaClient();

type FormState = {
  message: string;
};

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

export const createToDoItem = actionClient.schema(createToDoSchema).action(async ({ parsedInput }) => {
  const { createdBy, days_array, id, intendedFor, isRepeatable, isUrgent, title } = parsedInput;
  const AllDays = [1, 2, 3, 4, 5, 6, 7];
  const result = await prisma.to_do_item.create({
    data: {
      is_complete: false,
      is_urgent: isUrgent,
      title: title,
      finished_at: null,
      created_by: createdBy,
      created_for: +intendedFor?.value,
      created_on: new Date(),
      is_repeatable: isRepeatable ?? false,
      days_array: !!isRepeatable ? AllDays : days_array ?? [],
    },
  });

  return {
    result,
    message: "Successfully created to do item",
  };
});
