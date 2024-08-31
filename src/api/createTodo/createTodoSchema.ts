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
  isRepeatable: z.boolean(),
  days_array: z.coerce.number().array().min(1, { message: "Please choose at least one" }),
  hourOptions: OptionSchema.nullable(),
  timePeriod: OptionSchema.nullable(),
});

export const createToDoDefault = {
  id: 0,
  intendedFor: null as any,
  title: "",
  isUrgent: false,
  createdBy: 0,
  isRepeatable: false,
  days_array: [],
  hourOptions: null,
  timePeriod: null,
};

export const hourOptions = [
  { text: "01", value: "1" },
  { text: "02", value: "2" },
  { text: "03", value: "3" },
  { text: "04", value: "4" },
  { text: "05", value: "5" },
  { text: "06", value: "6" },
  { text: "07", value: "7" },
  { text: "08", value: "8" },
  { text: "09", value: "9" },
  { text: "10", value: "10" },
  { text: "11", value: "11" },
  { text: "12", value: "12" },
];
export const timePeriod = [
  { text: "AM", value: "1" },
  { text: "PM", value: "2" },
];
