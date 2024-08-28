"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createToDoSchema } from "@/api/createTodo/createTodoSchema";
import { actionClient } from "@/api/safe-actions/safe-action";

const prisma = new PrismaClient();

export const getAllUserOptions = actionClient.schema(z.coerce.number()).action(async ({ parsedInput }) => {
  const userId = parsedInput;

  const allUsers = await prisma.account_user.findMany({
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

  const result = allUsers?.map((i) => ({ text: i?.name, value: i?.id?.toString() }));

  return {
    message: "Got all users options",
    result,
  };
});

export const createToDoItem = actionClient.schema(createToDoSchema).action(async ({ parsedInput }) => {
  console.log("0asdasdasdasd");
  const { createdBy, days_array, id, intendedFor, isRepeatable, isUrgent, title } = parsedInput;
  const todayDate = new Date()?.getDay();
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
      days_array: !!isRepeatable ? AllDays : days_array ?? [todayDate] ?? [],
    },
  });

  return {
    result,
    message: "Successfully created to do item",
  };
});
