import { getUserQuery } from "./actions";

type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
  const getUser = await getUserQuery(+params?.userId);

  if (getUser?.data?.error) return <div>{getUser?.data?.error ?? "there was an error"}</div>;
  if (!getUser?.data?.userQuery) return <p>fetching...</p>;
  return (
    <>
      <p className="underline w-[100dvw]  flex-grow p-1 font-bold bg-black  text-white">{`Welcome ${getUser?.data?.userQuery?.name}`}</p>
      <div className="flex gap-4 justify-center flex-col w-[calc(100dvw_-_1rem)] p-4 grow">
        {/* <Container></Container> */}
        <div className="p-4 flex flex-row justify-between bg-purple-200 border-[0.15rem] rounded-lg  border-slate-700">
          <div>DAILY MESSAGE</div>
        </div>
        <div className="gap-2 flex flex-col">
          <div className="p-4 flex flex-row justify-between bg-white border-[0.15rem] rounded-lg  border-slate-700">
            <p>Chris Stats</p>
            <p>10/10</p>
          </div>
          <div className="p-4 flex flex-row justify-between bg-white border-[0.15rem] rounded-lg  border-slate-700">
            <p>Kelly Stats</p>
            <p>10/10</p>
          </div>
          <div className="p-4 flex flex-row justify-between bg-white border-[0.15rem] rounded-lg  border-slate-700">
            <p>Troy Stats</p>
            <p>10/10</p>
          </div>
        </div>
      </div>
    </>
  );
}
