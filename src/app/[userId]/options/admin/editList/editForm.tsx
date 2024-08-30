"use client";
import { OptionType } from "@/api/createTodo/createTodoSchema";
import { Dropdown } from "@/components/RHFSelect";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllUsersListItems } from "./actions";

type EditFormListProps = {
  userOptions: OptionType[];
};
export function EditFormList({ userOptions }: EditFormListProps) {
  const [selectedUser, setSelectedUser] = useState<OptionType | null>(null);
  const [listItems, setListItems] = useState<
    {
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
    }[]
  >([]);

  //   useEffect(() => {
  //     async function fetchListItems() {
  //       if (selectedUser) {
  //         const items = await getAllUsersListItems(selectedUser);
  //         if (!!items) return setListItems(items ?? []);
  //         return;
  //       }
  //     }
  //     fetchListItems();
  //   }, [selectedUser]);

  return (
    <div>
      <Dropdown
        isMulti={false}
        helperText=""
        onChange={(val) => setSelectedUser(val)}
        placeholder=""
        styles={{}}
        isDisabled={false}
        label="Intended For"
        name="intendedFor"
        options={userOptions ?? []}
      />
    </div>
  );
}
