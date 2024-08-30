"use client";
import { NavButtons } from "./NavButtons";

type NavbarProps = {
  userId: number;
  userName: string;
  isParent: boolean;
};
export function Navbar({ isParent = false, userId, userName }: NavbarProps) {
  return (
    <div className="bg-slate-800 min-w-[100vw] h-[7.5rem] p-2 w-screen rounded-sm">
      <p className="text-white">{userName && `Welcome back ${userName}`}</p>
      <NavButtons userId={userId} isParent={isParent} />
    </div>
  );
}
