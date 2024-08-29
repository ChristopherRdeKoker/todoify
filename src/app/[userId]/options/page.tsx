import Link from "next/link";

export default async function OptionsPage() {
  return (
    <div className="p-1 grid grid-cols-2 grid-rows-2 my-auto min-h-[80vh] grid-flow-row gap-2 justify-center items-center">
      <Link
        href={"options/message"}
        className="flex-col rounded-md p-2 text-center my-auto border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-blue-400 h-[calc(35vh)] grow "
      >
        Daily Message
      </Link>
      <Link
        href={"options/message"}
        className="flex-col rounded-md p-2 text-center my-auto border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-green-500  h-[calc(35vh)] grow "
      >
        asd
      </Link>
      <Link
        href={"/message"}
        className="flex-col rounded-md p-2 text-center my-auto border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-rose-300 h-[calc(35vh)] grow "
      >
        asd
      </Link>
      <Link
        href={"options/admin"}
        className="flex-col rounded-md p-2 text-center my-auto border-[0.1rem] border-slate-500 active:border-[0.2rem] bg-purple-300 h-[calc(35vh)] grow "
      >
        admin
      </Link>
    </div>
  );
}
