import React from "react";
import { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name?: string;
  isError?: Boolean;
  helperText?: string;
}

export const Textfield = React.forwardRef(function Textfield(
  { title, name, isError, helperText, ...rest }: TextfieldProps,
  ref
) {
  return (
    <div className="text-lg mr-6 flex flex-col gap-2">
      <label htmlFor={name!}>{title}</label>
      <input
        className="p-4 border-[0.1rem] rounded-md border-slate-400"
        {...rest}
        ref={ref as React.LegacyRef<HTMLInputElement>}
      />
      {helperText && <sub className={twMerge("", isError ? "text-red-400" : "")}>{helperText}</sub>}
    </div>
  );
});

export function RHFtextfield(props: TextfieldProps & { name: string }) {
  const formMethods = useFormContext();
  return (
    <Controller
      control={formMethods.control}
      name={props.name}
      render={({ field, fieldState }) => {
        return (
          <Textfield
            {...props}
            {...field}
            value={field?.value || ""}
            isError={fieldState.invalid}
            helperText={fieldState?.error?.message || props.helperText}
          />
        );
      }}
    />
  );
}
