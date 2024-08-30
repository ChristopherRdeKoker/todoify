import { format, isValid } from "date-fns";
const neatTimeFormat = "HH:mm";

export function parseDateValue(date: string | Date | null) {
  if (date === null) return null;

  const parsedDate = new Date(date.toString());

  if (!isValid(parsedDate)) return null;

  return parsedDate;
}

export function toNeatTime(date: string | Date | null) {
  const dateToFormat = parseDateValue(date);
  if (typeof dateToFormat === "string") return dateToFormat;

  return format(dateToFormat!, neatTimeFormat, {});
}
