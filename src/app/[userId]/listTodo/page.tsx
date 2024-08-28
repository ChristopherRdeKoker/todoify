import { Navbar } from "@/components/Navbar/Navbar";
import { getUserQuery } from "../homepage/actions";
import { Container } from "@/components/Container";
import { getMyTodoList } from "./actions";
import { TodoCard } from "./TodoCard";
import { ListItem } from "./ListItem";

type ListToDoParams = {
  userId: number;
};
export default async function ListToDo({ params }: { params: ListToDoParams }) {
  const todoData = await getMyTodoList(+params?.userId);

  return (
    <div className="">
      <Container>
        <p className="font-bold underline">TO DO LIST:</p>
      </Container>
      <div className="flex grow">
        <div className="flex grow max-h-[calc(75vh)] overflow-y-auto gap-2 flex-col p-1">
          {!!todoData?.data?.result && todoData?.data?.result?.map((i) => <ListItem input={i ?? []} key={i?.id} />)}
        </div>
      </div>
    </div>
  );
}
