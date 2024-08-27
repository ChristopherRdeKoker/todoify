export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex grow justify-center">
      <div className="flex items-center  bg-slate-400 flex-col gap-2 justify-start">{children}</div>
    </div>
  );
}
