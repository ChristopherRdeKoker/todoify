import { Container } from "@/components/Container";
import { NavIcon } from "./NavIcon";

type NavButtonsProps = {
  isParent: boolean;
  userId: number;
};
export function NavButtons({ isParent, userId }: NavButtonsProps) {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between">
        <section className="flex flex-row fill-slate-500 gap-4 p-1">
          <NavIcon color="purple" href={`/${userId}/homepage`} IconType={"Home"} />
          <NavIcon color="green" href={`/${userId}/listTodo`} IconType={"List"} />
          {!!isParent && <NavIcon color="blue" href={`/${userId}/createTodo`} IconType={"Create"} />}
        </section>
        <NavIcon color="red" href={`/`} IconType={"Logout"} />
      </div>
    </Container>
  );
}
