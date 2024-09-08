import { Navbar } from "@/components/Navbar/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div className=" mx-auto bg-gradient-to-r  from-red-300 overflow-hidden to-yellow-500 overflow-y-hidden h-[calc(100dvh_-_7.5rem)]">
        {children}
      </div>
      <Navbar
        roles={session?.userCredentails?.roles ?? []}
        userId={+(session?.userCredentails?.id ?? 0)}
        userName={session?.userCredentails?.name ?? "random weirdo"}
      />
    </div>
  );
}
