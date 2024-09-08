"use client";

import { Container } from "@/components/Container";
import { NavIcon } from "./NavIcon";
import { signOut } from "next-auth/react";

type NavButtonsProps = {
  isParent: boolean;
  userId: number;
};
export function NavButtons({ isParent, userId }: NavButtonsProps) {
  const handleSignout = async () => {
    await signOut();
  };
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <section className="flex flex-row fill-slate-500 gap-2">
          <NavIcon color="purple" href={`/homepage`} IconType={"Home"} />
          <NavIcon color="green" href={`/listTodo`} IconType={"List"} />
          <NavIcon color="green" href={`/options`} IconType={"Cat"} />
          {!!isParent && <NavIcon color="blue" href={`/createTodo`} IconType={"Create"} />}
        </section>
        <div className="" onClick={handleSignout}>
          <NavIcon color="red" href={`/`} IconType={"Logout"} />
        </div>
      </div>
    </Container>
  );
}
