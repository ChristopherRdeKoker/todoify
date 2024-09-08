"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createToDoSchema } from "@/app/api/createTodo/createTodoSchema";
import { safeAction } from "../../api/createSafeAction/createSafeAction";

const prisma = new PrismaClient();

export const getAllUserOptions = safeAction.schema(z.coerce.number()).action(async ({ parsedInput }) => {
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

export const getREALAllUserOptions = safeAction.action(async () => {
  const allUsers = await prisma.account_user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const result = allUsers?.map((i) => ({ text: i?.name, value: i?.id?.toString() }));

  return {
    message: "Got all users options",
    result,
  };
});

export const createToDoItem = safeAction.schema(createToDoSchema).action(async ({ parsedInput }) => {
  const { createdBy, days_array, id, intendedFor, isRepeatable, isUrgent, title, hourOptions, timePeriod } =
    parsedInput;
  const todayDate = new Date()?.getDay();
  const AllDays = [1, 2, 3, 4, 5, 6, 7];
  const unlockTime = !hourOptions?.value ? null : +hourOptions?.value + (timePeriod?.text == "PM" ? 12 : 0);

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
      unlock_time: unlockTime,
    },
  });

  return {
    result,
    message: "Successfully created to do item",
  };
});
