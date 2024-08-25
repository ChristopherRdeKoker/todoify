export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //catering for mobile only from this point on
  return (
    <div className="flex grow justify-center p-2">
      <div className="flex items-center w-[22rem] bg-slate-400 flex-col gap-2 justify-start">{children}</div>
    </div>
  );
}
