"use client";
import { Container } from "../Container";
import { NavButtons } from "./NavButtons";

type NavbarProps = {
  userId: number;
  userName: string;
  isParent: boolean;
};
export function Navbar({ isParent = false, userId, userName }: NavbarProps) {
  return (
    <div className="bg-slate-800 rounded-sm">
      {/* <Container> */}
      <p className="p-1 text-white">{userName && `Welcome back ${userName}`}</p>
      {/* </Container> */}
      <NavButtons userId={userId} isParent={isParent} />
    </div>
  );
}
