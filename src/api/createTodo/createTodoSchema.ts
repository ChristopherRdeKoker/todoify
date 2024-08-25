import { z } from "zod";

export const OptionSchema = z.object({
  text: z.string(),
  value: z.coerce.string(),
});

export type OptionType = {
  text: string;
  value: string;
};
export const createToDoSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(3, "At least 3 characters long"),
  intendedFor: OptionSchema,
  createdBy: z.coerce.number(),
  isUrgent: z.boolean(),
});

export const createToDoDefault = {
  id: 0,
  intendedFor: null as any,
  title: "",
  isUrgent: false,
  createdBy: 0,
};
