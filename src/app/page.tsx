import { Paperback } from "@/components/Paperback";

export default function Home() {
  return (
    <div className="rounded-md justify-center flex items-center flex-col">
      <form className="w-[30rem] flex flex-col gap-4">
        <Paperback>
          <h1>Login Page</h1>
        </Paperback>
      </form>
    </div>
  );
}
