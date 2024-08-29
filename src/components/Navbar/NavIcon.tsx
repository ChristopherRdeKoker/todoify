"use client";
import Link from "next/link";
import { FaHome, FaList, FaPenSquare } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type NavButtonProps = {
  href: string;
  IconType: "Home" | "List" | "Create" | "Logout";
  color: "purple" | "blue" | "green" | "black" | "red";
};
export function NavIcon({ IconType, href, color }: NavButtonProps) {
  const iconMap = {
    Home: FaHome,
    List: FaList,
    Create: FaPenSquare,
    Logout: FaRightFromBracket,
  };

  const IconComponent = iconMap[IconType];

  return (
    <Link href={href}>
      <IconComponent className={twMerge(`w-[4rem] h-[3.5rem]  active:fill-${color}-400`, `hover:fill-${color}-600`)} />
    </Link>
  );
}
