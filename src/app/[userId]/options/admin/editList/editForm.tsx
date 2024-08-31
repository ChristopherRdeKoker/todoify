"use client";
import { OptionType } from "@/api/createTodo/createTodoSchema";
import { getMyTodoList } from "@/app/[userId]/listTodo/actions";
import { ListItem } from "@/app/[userId]/listTodo/ListItem";
import { Dropdown } from "@/components/RHFSelect";
import { useRouter } from "next/navigation";

type chosenUserQuery = Awaited<ReturnType<typeof getMyTodoList>>;
type EditFormListProps = {
  userOptions: OptionType[];
  userData: chosenUserQuery;
};
export function EditFormList({ userOptions, userData }: EditFormListProps) {
  // const [selectedUser, setSelectedUser] = useState<OptionType | null>(null);
  const router = useRouter();

  const handleSearch = (query: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("chosenUser", query);

    router.push(`editList?${searchParams.toString()}`);
  };
  return (
    <div className="flex flex-col gap-2">
      <Dropdown
        isMulti={false}
        helperText=""
        onChange={(e) => {
          if (!e) return;
          handleSearch(e?.value);
        }}
        placeholder=""
        styles={{}}
        isDisabled={false}
        label="Intended For"
        name="intendedFor"
        options={userOptions ?? []}
      />
      {!!userData?.data?.result?.length && (
        <div className="flex grow max-h-[calc(75vh)] overflow-y-auto gap-2 flex-col p-1">
          {!!userData?.data?.result &&
            userData?.data?.result?.map((i) => <ListItem showIcon input={i ?? []} key={i?.id} />)}
        </div>
      )}
    </div>
  );
}
