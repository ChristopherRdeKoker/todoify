import { Paperback } from "@/components/Paperback";
import { getLoginUsers } from "./action";

export default async function Home() {
  const { result, error } = await getLoginUsers();

  return (
    <div className="rounded-md justify-center flex items-center flex-col">
      <form className="w-[30rem] flex flex-col gap-4">
        <Paperback>
          <h1>Login Page</h1>
          {!!result && (
            <div>
              <p>Users:</p>
              {result?.map((i) => (
                <div>{i?.name}</div>
              ))}
            </div>
          )}
        </Paperback>
      </form>
    </div>
  );
}
