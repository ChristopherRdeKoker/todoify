export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //catering for mobile only from this point on
  return <div className="flex justify-center items-center flex-col grow">{children}</div>;
}
