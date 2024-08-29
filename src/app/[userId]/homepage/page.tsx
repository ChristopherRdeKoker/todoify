import { Container } from "@/components/Container";
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
    <div className="flex justify-center flex-col grow">
      <Container>
        <p className="underline font-bold">{`Welcome ${getUser?.data?.userQuery?.name}`}</p>
      </Container>
    </div>
  );
}
