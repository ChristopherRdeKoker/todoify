import { getUserQuery } from "./actions";
import { Navbar } from "@/components/Navbar/Navbar";

type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
  const getUser = await getUserQuery(+params?.userId);

  if (getUser?.data?.error) return <div>{getUser?.data?.error ?? "there was an error"}</div>;
  if (!getUser?.data?.userQuery) return <p>fetching...</p>;
  return (
    <div>
      {/* <Navbar
        isParent={getUser?.data?.userQuery?.is_parent ?? false}
        userId={getUser?.data?.userQuery?.id}
        userName={getUser?.data?.userQuery?.name ?? ""}
      /> */}
      <div>111</div>
    </div>
  );
}
