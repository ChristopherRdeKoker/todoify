type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="m-1 shadow-md shadow-slate-700 rounded-md  p-2 bg-white">{children}</div>;
}
