import { Dropdown } from "@/components/RHFSelect";
import { EditFormList } from "./editForm";
import { getAllUserOptions } from "@/app/[userId]/createTodo/actions";
import { getAllUsersListItems } from "./actions";
import { useState } from "react";
import { OptionType } from "@/api/createTodo/createTodoSchema";
type EditListParams = {
  userId: number;
};
export default async function EditListItem({ params }: { params: EditListParams }) {
  const userOptions = await getAllUserOptions(+params?.userId);

  return (
    <div className="p-2 flex flex-col">
      <EditFormList userOptions={userOptions?.data?.result ?? []} />
    </div>
  );
}
