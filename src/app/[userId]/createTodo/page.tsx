import { Navbar } from "@/components/Navbar/Navbar";
import { Container } from "@/components/Container";

import { CreateForm } from "./CreateForm";
import { getUserQuery } from "../homepage/actions";
import { getAllUserOptions } from "./actions";
type CreateTodoParams = {
  userId: number;
};
export default async function CreateTodo({ params }: { params: CreateTodoParams }) {
  const getUser = await getUserQuery(+params?.userId);
  // const { error, success, userQuery } = getUser?.data;

  const userOptions = await getAllUserOptions(+params?.userId);

  if (getUser?.data?.error) return <div>{getUser?.data?.error ?? "there was an error"}</div>;
  if (!getUser?.data?.userQuery) return <p>fetching...</p>;

  return (
    <div>
      {/* <Navbar isParent={userQuery?.is_parent ?? false} userId={userQuery?.id} userName={userQuery?.name ?? ""} />
      <div className="flex grow my-auto flex-col justify-center items-center">
        <Container>
          <p className="underline font-bold text-xl pb-4 text-center  text-slate-500">Create TO DO:</p>
          <CreateForm IntendedOptions={userOptions?.result ?? []} userId={+params?.userId} />
        </Container>
      </div> */}
      <p>hmmm</p>
    </div>
  );
}
