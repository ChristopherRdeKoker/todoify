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
        <section className="flex flex-row fill-slate-500 gap-2">
          <NavIcon color="purple" href={`/homepage`} IconType={"Home"} />
          <NavIcon color="green" href={`/listTodo`} IconType={"List"} />
          <NavIcon color="green" href={`/options`} IconType={"Cat"} />
          {!!isParent && <NavIcon color="blue" href={`/createTodo`} IconType={"Create"} />}
        </section>
        <NavIcon color="red" href={`/`} IconType={"Logout"} />
      </div>
    </Container>
  );
}
