type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="m-1 rounded-md w-[21rem] p-2 bg-white">{children}</div>;
}
