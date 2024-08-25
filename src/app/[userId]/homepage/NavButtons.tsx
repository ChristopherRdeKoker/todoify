"use client";
import { Container } from "@/components/Container";
import Link from "next/link";
import { FaHome, FaList, FaPenSquare } from "react-icons/fa";
import { FaPenClip, FaRightFromBracket } from "react-icons/fa6";

type NavButtonsProps = {
  isParent: boolean;
  userId: number;
};
export function NavButtons({ isParent, userId }: NavButtonsProps) {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <section className=" flex flex-row fill-slate-500 gap-4 p-1">
          <Link href={`/${userId}/homepage`}>
            <FaHome className="w-[2.5rem] fill-gray-800 active:fill-purple-600 hover:fill-purple-500 h-[2.5rem]" />
          </Link>
          <Link href={`/${userId}/listTodo`}>
            <FaList className="w-[2.5rem] fill-gray-800 active:fill-green-600 hover:fill-green-400  h-[2.5rem]" />
          </Link>
          {!!isParent && (
            <Link href={`/${userId}/createTodo`}>
              <FaPenSquare className="w-[2.5rem] fill-gray-800 active:fill-blue-600 hover:fill-blue-400  h-[2.5rem]" />
            </Link>
          )}
        </section>
        <Link href={`/`}>
          <FaRightFromBracket className="w-[2.5rem] fill-gray-800 active:fill-red-600 hover:fill-red-400  h-[2.5rem]" />
        </Link>
      </div>
    </Container>
  );
}
