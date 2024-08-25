import { Container } from "@/components/Container";
import { getUserQuery } from "./actions";
import { NavButtons } from "./NavButtons";

type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
  // return <div>{`Successfully logged in ${params?.userId}`}</div>;
  const getUser = await getUserQuery(+params?.userId);
  const { error, success, userQuery } = getUser;

  if (error) return <div>{error ?? "there was an error"}</div>;
  return (
    <div>
      <Container>
        <p>{userQuery?.name && `Welcome back ${userQuery?.name}`}</p>
      </Container>
      <NavButtons />
    </div>
  );
}
