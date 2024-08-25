import { getUserQuery } from "./actions";
import { Navbar } from "@/components/Navbar/Navbar";

type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
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
