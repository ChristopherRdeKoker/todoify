"use server";

import prisma from "../../../../database/prisma/prisma";

export async function getMyTodoList(userId: number) {
  try {
    const today = new Date()?.getDay();

    const getMyToDoQuery = await prisma.to_do_item.findMany({
      where: {
        created_for: userId,
        AND: [{ is_repeatable: false }, { days_array: { has: today ?? 0 } }],
      },
    });
    if (!getMyToDoQuery) {
      return { error: "Something went wrong brah" };
    }

    return {
      success: true,
      result: getMyToDoQuery,
    };
  } catch (error) {
    console.log(error);
  }
}

// export async function getUserQuery(input: number) {
//   try {
//     const userQuery = await prisma.account_user?.findFirst({
//       where: {
//         id: +(input ?? 0),
//       },
//     });
//     if (!userQuery) {
//       return { error: "No user data found" };
//     }

//     const { password, email, ...safeQuery } = userQuery;

//     // let isParent =
//     return {
//       success: true,
//       userQuery: safeQuery,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       error: "An unexpected error occurred",
//     };
//   }
// }
