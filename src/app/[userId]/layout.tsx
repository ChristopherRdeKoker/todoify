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
    <div>
      <div className=" mx-auto bg-gradient-to-r max-w-[23rem] from-red-300 overflow-hidden to-yellow-500 overflow-y-hidden h-[calc(100dvh_-_7.1rem)]">
        {children}
      </div>
      <Navbar
        isParent={userQuery?.data?.userQuery?.is_parent ?? false}
        userId={userQuery?.data?.userQuery?.id ?? 0}
        userName={userQuery?.data?.userQuery?.name ?? "random weirdo"}
      />
    </div>
  );
}
