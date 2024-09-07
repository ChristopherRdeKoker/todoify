"use client";

import { FaTrash } from "react-icons/fa";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { captureList, deleteToDoList } from "./actions";
import { toNeatTime } from "@/lib/dateFormat";

type ListItemProps = {
  input: {
    id: number;
    title: string;
    is_complete: boolean;
    is_urgent: boolean;
    created_by: number;
    created_for: number;
    created_on: Date;
    finished_at: Date | null;
    is_repeatable: boolean;
    days_array: number[];
  };
  showIcon?: boolean;
  disableSubmit?: boolean;
};

export function ListItem({ input, showIcon, disableSubmit = false }: ListItemProps) {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState("");
  const isCompletedClassname = input?.is_complete
    ? "border-green-600 bg-green-300 hover:bg-green-200"
    : input?.is_urgent
    ? "border-red-600 bg-red-300 active:bg-red-200"
    : "border-black active:bg-red-200";

  const handleSubmit = async () => {
    if (input?.is_complete || !!disableSubmit) return;
    setCount((prev) => prev + 1);
    if (count >= 3) {
      setMessage("updating...");
      //handle
      const result = await captureList(input?.id);
      if (!result?.data?.result) return console.log("failed to update list");
      setMessage("");
    }
  };

  const handleDelete = async (idToDel: number) => {
    if (!idToDel) return;
    const result = await deleteToDoList(idToDel);
  };
  return (
    <div
      onClick={handleSubmit}
      className={twMerge(
        "rounded-md select-none  cursor-pointer flex-col items-center  transform flex grow border-black-600 border-[0.15rem] transition-transform duration-100 active:scale-95 p-2 min-h-[5rem]",
        isCompletedClassname
      )}
    >
      {!!message?.length ? (
        <p className="text-error-300 flex justify-center grow mx-auto text-center">{message}</p>
      ) : (
        <div className=" flex flex-col grow">
          {input?.is_urgent && !input?.is_complete && <p className="text-red-400 text-2xl">---URGENT---</p>}
          <p className="font-bold">{input?.title}</p>
          <div id="left" className="flex"></div>
          <div id="right" className="flex">
            <div className="flex w-full  flex-row justify-between">
              <p className="text-xs">{`Created: ${!!input?.created_on ? toNeatTime(input?.created_on) : ""}`}</p>
            </div>
          </div>
          {!!showIcon && (
            <div className="flex grow justify-end items-end ">
              <FaTrash onClick={() => handleDelete(input?.id)} className="h-10 w-10 " />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
