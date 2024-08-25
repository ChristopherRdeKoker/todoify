"use client";
import { Container } from "@/components/Container";
import Link from "next/link";
import { FaHome, FaList, FaPenSquare } from "react-icons/fa";
import { FaPenClip, FaRightFromBracket } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type NavButtonsProps = {
  isParent: boolean;
  userId: number;
};
export function NavButtons({ isParent, userId }: NavButtonsProps) {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <section className="flex flex-row fill-slate-500 gap-4 p-1">
          <NavButton href={`/${userId}/homepage`} IconType={"Home"} />
          <NavButton href={`/${userId}/listTodo`} IconType={"List"} />
          <NavButton href={`/${userId}/createTodo`} IconType={"Create"} />
        </section>
        <Link href={`/`}>
          <FaRightFromBracket className="w-[2.5rem] fill-gray-800 active:fill-red-600 hover:fill-red-400 h-[2.5rem]" />
        </Link>
      </div>
    </Container>
  );
}

type NavButtonProps = {
  href: string;
  IconType: "Home" | "List" | "Create" | "Logout";
};
export function NavButton({ IconType, href }: NavButtonProps) {
  const iconMap = {
    Home: FaHome,
    List: FaList,
    Create: FaPenSquare,
    Logout: FaRightFromBracket,
  };

  let color = "";
  switch (IconType) {
    case "Home":
      color = "purple";
      break;
    case "Create":
      color = "blue";
      break;
    case "List":
      color = "green";
      break;
    default:
      color = "black";
  }

  const IconComponent = iconMap[IconType];

  return (
    <Link href={href}>
      <IconComponent
        className={twMerge("w-[2.5rem] fill-gray-800  h-[2.5rem]", `ctive:fill-${color}-600 hover:fill-${color}-400`)}
      />
    </Link>
  );
}
