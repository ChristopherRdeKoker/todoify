import { Navbar } from "@/components/Navbar/Navbar";
import { getUserQuery } from "./homepage/actions";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { userId: number };
}>) {
  const userQuery = await getUserQuery(+params?.userId);

  const hasData = userQuery?.data?.userQuery?.id;
  return (
    <div className="flex min-h-screen grow justify-center">
      <div className="flex grow min-h-screen  items-center bg-slate-100 h-[calc(100%)]   flex-col gap-2 justify-start">
        <div className=" bg-gradient-to-r from-red-300 to-yellow-500 min-h-[calc(100vh_-_8rem)]">{children}</div>
        <Navbar
          isParent={userQuery?.data?.userQuery?.is_parent ?? false}
          userId={userQuery?.data?.userQuery?.id ?? 0}
          userName={userQuery?.data?.userQuery?.name ?? "random weirdo"}
        />
      </div>
    </div>
  );
}
