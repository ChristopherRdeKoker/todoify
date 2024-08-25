import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant: keyof typeof buttonVariant;
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  isDisabled?: boolean;
  // buttonStatus:
}

const buttonVariant = {
  primary: "bg-slate-300 border-slate-600",
  reset: "bg-red-300 border-slate-600",
};

export function Button({
  title,
  isDisabled = false,
  variant = "primary",
  type = "button",
  className,

  ...rest
}: ButtonType) {
  return (
    <button
      type={type}
      {...rest}
      disabled={isDisabled}
      className={twMerge(
        "flex h-12 min-w-[4rem] text-lg rounded-lg max-w-[14.375rem] grow items-center justify-center gap-2 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-75  border-[0.1rem] ",
        buttonVariant[variant],
        className
      )}
    >
      {isDisabled ? "..." : title}
    </button>
  );
}
