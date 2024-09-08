"use server";
import { safeAction } from "@/app/api/createSafeAction/createSafeAction";
import { OptionSchema } from "@/app/api/createTodo/createTodoSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsersListItems = safeAction.schema(OptionSchema.nullable()).action(async ({ parsedInput }) => {
  if (!parsedInput?.value) return { error: "No user id found" };
  const userId = +parsedInput?.value;
  const today = new Date().getDay();

  const getUsersListItems = await prisma.to_do_item.findMany({
    where: {
      created_for: userId,
      OR: [
        {
          days_array: { has: today },
        },
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
    result: getUsersListItems,
    message: "Successfully retrieved today's and incomplete to-do list",
  };
});
