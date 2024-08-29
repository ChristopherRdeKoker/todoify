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
    <div className="bg-slate-800 mx-auto p-1 rounded-sm">
      <p className="text-white">{userName && `Welcome back ${userName}`}</p>
      <NavButtons userId={userId} isParent={isParent} />
    </div>
  );
}
