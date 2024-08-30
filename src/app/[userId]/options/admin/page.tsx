import { Container } from "@/components/Container";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="h-[100vdh] items-end p-4 flex justify-center">
      <Link href={"admin/editList"}>
        <Container>
          <p className="h-[3rem] text-center">Edit List Items</p>
        </Container>
      </Link>
    </div>
  );
}
