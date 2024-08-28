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
      <div className="flex items-center  bg-slate-100 flex-col gap-2 justify-start">
        <div className="flex flex-col grow max-h-[calc(85vh)]">{children}</div>
        <Navbar
          isParent={userQuery?.data?.userQuery?.is_parent ?? false}
          userId={userQuery?.data?.userQuery?.id ?? 0}
          userName={userQuery?.data?.userQuery?.name ?? "random weirdo"}
        />
      </div>
    </div>
  );
}
