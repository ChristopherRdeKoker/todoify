"use server";

import { actionClient } from "@/api/safe-actions/safe-action";
import prisma from "../../../../database/prisma/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const captureList = actionClient.schema(z.coerce.number()).action(async ({ parsedInput }) => {
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

export const getMyTodoList = actionClient.schema(z.coerce.number()).action(async ({ parsedInput }) => {
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
