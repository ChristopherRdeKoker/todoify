export function Paperback({ children }: { children: React.ReactNode }) {
  if (!children) return <h1>problem with layout...</h1>;
  return (
    <div className="h-full shadow-md shadow-slate-600 w-full flex flex-col gap-4 border-[0.1rem] border-slate-400 bg-slate-50 text-bold p-4 rounded-md">
      {children}
    </div>
  );
}
