"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createToDoDefault, createToDoSchema, OptionType } from "@/api/createTodo/createTodoSchema";
import { z } from "zod";
import { RHFCheckbox } from "@/components/RHFCheckbox";
import { RHFtextfield } from "@/components/RHFTextfield";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/Button";
import { createToDoItem } from "./actions";
import { useRef } from "react";
import { Day } from "./days";

type CreateFormProps = {
  userId: number;
  IntendedOptions: OptionType[];
};
export function CreateForm({ userId, IntendedOptions }: CreateFormProps) {
  const formMethods = useForm({
    resolver: zodResolver(createToDoSchema),
    defaultValues: {
      ...createToDoDefault,
      createdBy: userId ?? 0,
      days_array: [],
    },
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    try {
      const result = await createToDoItem(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

  const handleReset = () => formMethods.reset();

  return (
    <FormProvider {...formMethods}>
      <form onReset={handleReset} onSubmit={handleSubmit} className="max-w-[26rem] w-full flex flex-col gap-4">
        <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre>
        <RHFtextfield title={"Title:"} name={"title"} />
        <RHFSelect
          isMulti={false}
          placeholder=""
          styles={{}}
          isDisabled={false}
          label="Intended For"
          name="intendedFor"
          options={IntendedOptions ?? []}
        />
        <div className="flex flex-row">
          <RHFCheckbox name="isUrgent" title="Is Urgent" />
          <RHFCheckbox name="isRepeatable" title="Is Repeatable" />
        </div>
        <div className="flex grow pt-12 pr-4 gap-1  justify-evenly ">
          <Day currentDay="Mon" />
          <Day currentDay="Tue" />
          <Day currentDay="Wed" />
          <Day currentDay="Thu" />
          <Day currentDay="Fri" />
          <Day currentDay="Sat" />
          <Day currentDay="Sun" />
        </div>
        <div className="flex pt-8 flex-row justify-between gap-2 mr-6">
          <Button title="Reset" onClick={handleReset} variant="reset" />
          <Button title="Create" variant="primary" type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </FormProvider>
  );
}
