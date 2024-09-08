import { createSafeActionClient } from "next-safe-action";

export const safeAction = createSafeActionClient();

export const safeAdminAction = createSafeActionClient({});
//keep
