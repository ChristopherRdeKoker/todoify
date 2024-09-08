import { AccountRoleEnum } from "@/app/api/HelpfulEnums";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OptionsPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const isAdmin = session?.userCredentails?.roles?.some((i) => +(i?.value ?? 0) == AccountRoleEnum.admin);

  return (
    <div className="p-8 grid grid-cols-2 grid-rows-2 my-auto min-h-[80vh] grid-flow-row gap-2 justify-center items-center">
      <Link
        href={"options/message"}
        className="flex-col rounded-md p-2 text-center  border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-blue-400 grow "
      >
        <div className="flex justify-center h-[10rem] items-center">
          <p>Daily Message</p>
        </div>
      </Link>
      <Link
        href={"options/message"}
        className="flex-col rounded-md p-2 text-center  border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-green-400 grow "
      >
        <div className="flex justify-center h-[10rem] items-center">
          <p>TBA</p>
        </div>
      </Link>
      <Link
        href={"options/message"}
        className="flex-col rounded-md p-2 text-center  border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-rose-400 grow "
      >
        <div className="flex justify-center h-[10rem] items-center">
          <p>TBA</p>
        </div>
      </Link>
      <Link
        href={isAdmin ? "options/admin" : "options"}
        className="flex-col rounded-md p-2 text-center  border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-purple-400 grow "
      >
        <div className="flex justify-center h-[10rem] items-center">
          <p>Admin</p>
        </div>
      </Link>
    </div>
  );
}
