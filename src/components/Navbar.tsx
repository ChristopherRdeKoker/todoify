"use client";
import { NavButtons } from "@/app/[userId]/homepage/NavButtons";
import { Container } from "./Container";

type NavbarProps = {
  userId: number;
  userName: string;
  isParent: boolean;
};
export function Navbar({ isParent = false, userId, userName }: NavbarProps) {
  return (
    <div>
      <Container>
        <p>{userName && `Welcome back ${userName}`}</p>
      </Container>
      <NavButtons userId={userId} isParent={isParent} />
    </div>
  );
}
