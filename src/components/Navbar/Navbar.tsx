"use client";
import { AccountRoleEnum } from "@/app/auth.config";
import { OptionType } from "../../../global";
import { NavButtons } from "./NavButtons";

type NavbarProps = {
  userId: number;
  userName: string;
  roles: OptionType[];
};
export function Navbar({ userId, userName, roles }: NavbarProps) {
  const isParent = roles?.some((i) => (+i?.value ?? 0) == AccountRoleEnum.parent);
  return (
    <div className="bg-slate-800 min-w-[100dvw] h-[7.5rem] p-2  rounded-sm">
      <p className="text-white">{userName && `Welcome back ${userName}`}</p>
      <NavButtons userId={userId} isParent={isParent} />
    </div>
  );
}
