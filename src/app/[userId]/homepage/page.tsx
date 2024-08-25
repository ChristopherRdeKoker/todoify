type HomepageParams = {
  userId: number;
};
export default async function Homepage({ params }: { params: HomepageParams }) {
  return <div>{`Successfully logged in ${params?.userId}`}</div>;
}
