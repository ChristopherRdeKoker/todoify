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
    },
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    try {
      const result = await createToDoItem(data);
      if (result) {
        formMethods.reset();
        console.log("added new to do item successfully");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handleReset = () => formMethods.reset();

  return (
    <FormProvider {...formMethods}>
      <form className="w-[21rem] flex flex-col gap-4">
        {/* <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre> */}
        <RHFCheckbox name="isUrgent" title="Is Urgent" />
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
        <div className="flex flex-row justify-between gap-2 mr-6">
          <Button title="Reset" onClick={handleReset} variant="reset" />
          <Button title="Create" variant="primary" onClick={handleSubmit} />
        </div>
      </form>
    </FormProvider>
  );
}
