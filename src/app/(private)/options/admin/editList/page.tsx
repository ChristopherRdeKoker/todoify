import { Dropdown } from "@/components/RHFSelect";
import { EditFormList } from "./editForm";
import { getAllUsersListItems } from "./actions";
import { useState } from "react";
import { OptionType } from "@/api/createTodo/createTodoSchema";
import { getREALAllUserOptions } from "@/app/(private)/createTodo/actions";
import { getMyTodoList } from "@/app/(private)/listTodo/actions";
type EditListParams = {
  userId: number;
};
export default async function EditListItem({
  params,
  searchParams,
}: {
  params: EditListParams;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userOptions = await getREALAllUserOptions();
  const chosenUserId = searchParams?.chosenUser as string;

  const chosenUserQuery = await getMyTodoList(+chosenUserId);

  return (
    <div className="p-2 flex flex-col">
      <EditFormList userData={chosenUserQuery} userOptions={userOptions?.data?.result ?? []} />
    </div>
  );
}
