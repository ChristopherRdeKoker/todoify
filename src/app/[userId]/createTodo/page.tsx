import { Navbar } from "@/components/Navbar";
import { getUserQuery } from "./actions";
type CreateTodoParams = {
  userId: number;
};
export default async function CreateTodo({ params }: { params: CreateTodoParams }) {
  const getUser = await getUserQuery(+params?.userId);
  const { error, success, userQuery } = getUser;

  if (error) return <div>{error ?? "there was an error"}</div>;
  if (!userQuery) return <p>fetching...</p>;
  return (
    <div>
      <Navbar isParent={userQuery?.is_parent ?? false} userId={userQuery?.id} userName={userQuery?.name ?? ""} />
    </div>
  );
}
