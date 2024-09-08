import { Navbar } from "@/components/Navbar/Navbar";
import { Container } from "@/components/Container";

import { CreateForm } from "./CreateForm";
import { getUserQuery } from "../homepage/actions";
import { getAllUserOptions } from "./actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreateTodo() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const getUser = await getUserQuery(+(session?.userCredentails?.id ?? 0));
  const userOptions = await getAllUserOptions(+(session?.userCredentails?.id ?? 0));

  if (getUser?.data?.error) return <div>{getUser?.data?.error ?? "there was an error"}</div>;
  if (!getUser?.data?.userQuery) return <p>fetching...</p>;

  return (
    <div className="min-h-[100%] flex  my-auto  flex-col justify-center items-center">
      <Container>
        <p className="underline font-bold text-xl pb-2 text-center  text-slate-500">Create TO DO:</p>
        <CreateForm IntendedOptions={userOptions?.data?.result ?? []} userId={+(session?.userCredentails?.id ?? 0)} />
      </Container>
    </div>
  );
}
