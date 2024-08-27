"use server";

import { LoginForm } from "./LoginForm";

export default async function Home() {
  return (
    <div className="rounded-md h-full justify-center flex items-center flex-col">
      <LoginForm />
    </div>
  );
}
