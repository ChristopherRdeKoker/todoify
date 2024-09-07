type TodoCardProps = {
  data: {
    id: number;
    title: string;
    is_complete: boolean;
    is_urgent: boolean;
    created_by: number;
    created_for: number;
    created_on: Date;
    finished_at: Date | null;
    is_repeatable: boolean;
    days_array: number[];
  };
};

export function TodoCard({ data }: TodoCardProps) {
  return <div className="w-full max-w-[22rem] rounded-md border-[0.1rem] border-slate-400">{data?.title}</div>;
}
