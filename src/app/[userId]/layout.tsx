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
    <div className="flex grow justify-center">
      <div className="flex grow  items-center bg-slate-100   flex-col justify-start">
        <div className="min-w-[100vw] mx-auto bg-gradient-to-r from-red-300 to-yellow-500 min-h-[calc(100dvh_-_7rem)]">
          {children}
        </div>
        <Navbar
          isParent={userQuery?.data?.userQuery?.is_parent ?? false}
          userId={userQuery?.data?.userQuery?.id ?? 0}
          userName={userQuery?.data?.userQuery?.name ?? "random weirdo"}
        />
      </div>
    </div>
  );
}
