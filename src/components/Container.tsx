type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="m-2 rounded-md w-[21rem] p-2 bg-white">{children}</div>;
}
