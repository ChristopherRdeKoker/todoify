import { Navbar } from "@/components/Navbar/Navbar";
import { getUserQuery } from "../homepage/actions";
import { Container } from "@/components/Container";
import { getMyTodoList } from "./actions";
import { TodoCard } from "./TodoCard";

type ListToDoParams = {
  userId: number;
};
export default async function ListToDo({ params }: { params: ListToDoParams }) {
  const getUser = await getUserQuery(+params?.userId);
  const { error, success, userQuery } = getUser;
  if (error) return <div>{error ?? "there was an error"}</div>;

  const listdata = await getMyTodoList(+params?.userId ?? 0);

  if (!userQuery || !listdata?.result) return <p>fetching...</p>;

  return (
    <div>
      <Navbar isParent={userQuery?.is_parent ?? false} userId={userQuery?.id} userName={userQuery?.name ?? ""} />
      <div className="flex grow my-auto flex-col justify-center items-center">
        <Container>
          <p className="underline font-bold text-center text-xl pb-4 text-slate-500">TO DO LIST:</p>
          {!!listdata?.result &&
            listdata?.result?.map((i) => {
              return <TodoCard key={i?.id} data={i} />;
            })}
        </Container>
      </div>
    </div>
  );
}
