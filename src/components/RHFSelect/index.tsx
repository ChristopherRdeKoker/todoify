import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

import { twMerge } from "tailwind-merge";
import StateManagedSelect from "react-select";
import { OptionType } from "@/api/createTodo/createTodoSchema";
import { Optional } from "@prisma/client/runtime/library";

interface DropdownProp<TOptionType extends OptionType, TIsMulti extends boolean>
  extends Omit<StateManagedSelect, "options"> {
  label: string;
  options: TOptionType[];
  onChange: (
    options: TIsMulti extends true ? MultiValue<TOptionType> : SingleValue<TOptionType>,
    action: ActionMeta<any>
  ) => void;
  placeholder?: string;
  isMulti?: TIsMulti;
  name?: string;
  isError?: boolean;
  helperText: string;
  value?: TOptionType | TOptionType[];
  isDisabled?: boolean;
  styles?: any;
}

export function Dropdown<TOptionType extends OptionType>(
  DropdownProps: DropdownProp<TOptionType, false>
): React.JSX.Element;
export function Dropdown<TOptionType extends OptionType, TIsMulti extends boolean>(
  DropdownProps: DropdownProp<TOptionType, TIsMulti>
): React.JSX.Element;
export function Dropdown<TOptionType extends OptionType, TIsMulti extends boolean>({
  options,
  label: title,
  placeholder = "Select One",
  isMulti,
  name,
  isDisabled,
  onChange,
  isError,
  helperText,
  value,
  styles = {},
  ...rest
}: DropdownProp<TOptionType, TIsMulti>) {
  let isErrorClassname = isError ? "text-error-main " : "";
  return (
    <div className="flex w-full mr-6 flex-col gap-2">
      <h1 className={twMerge("relative text-heading3 font-bold text-gray-main", isErrorClassname)}>{title}</h1>
      <Select<TOptionType>
        name={name}
        styles={{
          menuList: (baseStyles) => ({
            ...baseStyles,
            maxHeight: "15rem",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 90,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: "3.5rem",
            border: "none",
            backgroundColor: isDisabled ? "#e9e9ea" : "#fff",
            color: "#AEACB1",
            cursor: "pointer",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "gray-main",
          }),
          ...styles,
        }}
        placeholder={placeholder}
        className={
          `
                    mr-6
						  rounded-md
                    border-[0.1rem] border-slate-400
                    text-text2
                    [&_[class$="control"]]:${isError ? "border-red-600" : "border-primary-main"}
                ` as any
        }
        isSearchable
        options={options}
        getOptionLabel={(i) => i.text}
        value={value}
        isDisabled={isDisabled ?? false}
        isMulti={isMulti as any}
        onChange={(data, action) => {
          onChange(data as any, action);
        }}
        {...rest}
      />

      {isError && (
        <sub
          className={twMerge(
            `-mt-2 mb-2 block h-6 text-xs font-medium text-gray-400 `,
            !!isError ? "text-red-500" : ""
          )}
        >
          {helperText}
        </sub>
      )}
    </div>
  );
}

export function RHFSelect<T, TIsMulti extends boolean = true, TOptionType extends OptionType = OptionType>(
  props: Optional<DropdownProp<TOptionType, TIsMulti>, "helperText" | "isError" | "onChange" | "value"> & {
    name: keyof T;
  }
) {
  const formMethods = useFormContext();

  interface ErrorWithTextOptionType {
    text: {
      message: string;
    };
  }

  interface ErrorWithValueOptionType {
    value: {
      message: string;
    };
  }

  return (
    <Controller
      control={formMethods.control}
      name={props.name as string}
      render={({ field: { onChange, ...field }, fieldState }) => {
        let fieldError = fieldState.error;
        let isOptionTextType = !!fieldState?.error && typeof fieldError == "object" && "text" in fieldState?.error;

        let isOptionValueType = !!fieldState?.error && typeof fieldError == "object" && "value" in fieldState?.error;
        let isNullError = !!fieldError && field?.value == null;

        return (
          <Dropdown<TOptionType, TIsMulti>
            {...props}
            value={field.value}
            isMulti={props?.isMulti}
            onChange={(item, action) => {
              if (props.onChange) {
                props.onChange(item as any, action);
              }

              onChange(item);
            }}
            isError={fieldState.invalid}
            helperText={
              !!isNullError
                ? "Please select an option"
                : !!isOptionTextType
                ? (fieldState.error as any as ErrorWithTextOptionType).text.message
                : !!isOptionValueType
                ? (fieldState.error as any as ErrorWithValueOptionType).value.message
                : fieldState.error?.message ?? props?.helperText ?? ""
            }
          />
        );
      }}
    />
  );
}
