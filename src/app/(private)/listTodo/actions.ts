"use server";

import prisma from "../../../../database/prisma/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/app/api/createSafeAction/createSafeAction";

export const captureList = safeAction.schema(z.coerce.number()).action(async ({ parsedInput }) => {
  const listId = parsedInput;
  const result = await prisma.to_do_item.update({
    where: {
      id: listId,
    },
    data: {
      is_complete: true,
      finished_at: new Date(),
    },
  });

  const usersId = result?.created_for;

  revalidatePath(`/[${usersId}]/listToDo`, "page");

  return {
    result,
    message: "successfully captured list item",
  };
});

export const getMyTodoList = safeAction.schema(z.coerce.number()).action(async ({ parsedInput }) => {
  const userId = parsedInput;
  const today = new Date().getDay();

  const getMyToDoQuery = await prisma.to_do_item.findMany({
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    where: {
      created_for: userId,
      OR: [
        // All tasks for today (completed or not)
        {
          days_array: { has: today },
        },
        // Incomplete tasks from any day
        {
          is_complete: false,
        },
        {
          is_repeatable: true,
        },
      ],
    },
    orderBy: [
      { is_complete: "asc" }, // Incomplete tasks first
      { is_urgent: "desc" }, // Urgent tasks next
      { created_on: "asc" }, // Older tasks first
    ],
  });

  return {
    result: getMyToDoQuery,
    message: "Successfully retrieved today's and incomplete to-do list",
  };
});

export const deleteToDoList = safeAction.schema(z.coerce.number()).action(async ({ parsedInput }) => {
  const delId = parsedInput;

  const result = await prisma.to_do_item.delete({
    where: {
      id: delId,
    },
  });
  revalidatePath("editList");
  return {
    result: result,
    message: "Successfully deleted to-do list",
  };
});
