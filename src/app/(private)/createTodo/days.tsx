"use client";

import { DaysoftheWeekEnum } from "@/app/api/enums";
// import { DaysoftheWeekEnum } from "@/api/enums";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type DayProps = {
  currentDay: keyof typeof DaysoftheWeekEnum;
};

export function Day({ currentDay }: DayProps) {
  const { watch, setValue } = useFormContext();
  const daysArray: number[] = watch("days_array") || [];
  const isActive = daysArray.includes(DaysoftheWeekEnum[currentDay]);
  const isActiveClassname = isActive ? "bg-green-500" : "bg-slate-200";

  const handleClick = () => {
    const dayValue = DaysoftheWeekEnum[currentDay];
    if (isActive) {
      setValue(
        "days_array",
        daysArray.filter((day) => day !== dayValue)
      );
    } else {
      setValue("days_array", [...daysArray, dayValue]);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "cursor-pointer select-none active:bg-slate-300 flex grow border-[0.2rem] font-bold p-1 border-slate-500 rounded-md",
        isActiveClassname
      )}
    >
      {currentDay}
    </div>
  );
}
