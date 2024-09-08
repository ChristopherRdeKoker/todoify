import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { AccountRoleEnum } from "../HelpfulEnums";

export const safeAction = createSafeActionClient();

//keep
export const safeAdminAction = safeAction.use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Session not found!");
  }

  const isAdmin = session?.userCredentails?.roles?.some((i) => +i?.value == AccountRoleEnum.admin);

  if (!isAdmin) {
    throw new Error("User is not admin!");
  }

  return next({ ctx: { session } });
});
