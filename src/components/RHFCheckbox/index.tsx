import React from "react";
import { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name?: string;
  isError?: boolean;
  helperText?: string;
}

export const Checkbox = React.forwardRef(function Checkbox(
  { title, name, isError, helperText, ...rest }: CheckboxProps,
  ref
) {
  return (
    <div className="w-full text-lg flex flex-col gap-2">
      <label htmlFor={name!} className="flex items-center gap-2">
        <input
          type="checkbox"
          className="p-2 w-6 h-6 border rounded-md border-slate-400"
          {...rest}
          ref={ref as React.LegacyRef<HTMLInputElement>}
        />
        {title}
      </label>
      {helperText && <sub className={twMerge("", isError ? "text-red-400" : "")}>{helperText}</sub>}
    </div>
  );
});

export function RHFCheckbox(props: CheckboxProps & { name: string }) {
  const formMethods = useFormContext();
  return (
    <Controller
      control={formMethods.control}
      name={props.name}
      render={({ field, fieldState }) => {
        return (
          <Checkbox
            {...props}
            {...field}
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            isError={fieldState.invalid}
            helperText={fieldState?.error?.message || props.helperText}
          />
        );
      }}
    />
  );
}
