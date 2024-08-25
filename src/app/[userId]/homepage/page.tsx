import { Container } from "@/components/Container";

type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
  // return <div>{`Successfully logged in ${params?.userId}`}</div>;
  return (
    <Container>
      <p>11</p>
    </Container>
  );
}
