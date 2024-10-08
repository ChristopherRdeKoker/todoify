"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createToDoDefault,
  createToDoSchema,
  hourOptions,
  OptionType,
  timePeriod,
} from "@/app/api/createTodo/createTodoSchema";
import { Checkbox, RHFCheckbox } from "@/components/RHFCheckbox";
import { RHFtextfield } from "@/components/RHFTextfield";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/Button";
import { createToDoItem } from "./actions";
import { Day } from "./days";
import { useState } from "react";

type CreateFormProps = {
  userId: number;
  IntendedOptions: OptionType[];
};
export function CreateForm({ userId, IntendedOptions }: CreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date()?.getDay();
  const formMethods = useForm({
    resolver: zodResolver(createToDoSchema),
    defaultValues: {
      ...createToDoDefault,
      createdBy: userId ?? 0,
      days_array: today ? [today] : [],
    },
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    console.log("boom");
    try {
      setIsSubmitting(true);

      const result = await createToDoItem(data);
      if (result?.serverError) console.log(result?.serverError);
      if (result?.validationErrors) console.log(result?.serverError);

      console.log(result);
      if (!!result?.data) {
        formMethods.reset();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleReset = () => formMethods.reset();

  return (
    <FormProvider {...formMethods}>
      <form onReset={handleReset} onSubmit={handleSubmit} className="max-w-[26rem] w-full flex flex-col gap-4">
        {/* <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre> */}
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
        <Checkbox
          title="Add specific time?"
          checked={isOpen}
          onClick={() =>
            setIsOpen((openrino) => {
              if (openrino == false) return true;
              formMethods.setValue("timePeriod", null);
              formMethods.setValue("hourOptions", null);
              return false;
            })
          }
        />
        {!!isOpen && (
          <div className="flex flex-row grows">
            <RHFSelect
              placeholder=""
              styles={{}}
              isDisabled={false}
              isMulti={false}
              label="Start time:"
              name={"hourOptions"}
              options={hourOptions}
            />
            <div className="w-[15rem]">
              <RHFSelect
                placeholder=""
                styles={{}}
                isDisabled={false}
                isMulti={false}
                label="Period"
                name={"timePeriod"}
                options={timePeriod}
              />
            </div>
          </div>
        )}
        <div className="flex grow pt-8 pr-4 gap-1  justify-evenly ">
          <Day currentDay="Mon" />
          <Day currentDay="Tue" />
          <Day currentDay="Wed" />
          <Day currentDay="Thu" />
          <Day currentDay="Fri" />
          <Day currentDay="Sat" />
          <Day currentDay="Sun" />
        </div>
        {!isSubmitting ? (
          <div className="flex pt-8 flex-row justify-between gap-1 ">
            <Button title="Reset" onClick={handleReset} variant="reset" />
            <Button title="Create" variant="primary" type="submit" onSubmit={handleSubmit} />
          </div>
        ) : (
          <p className="text-center">Submitting...</p>
        )}
      </form>
    </FormProvider>
  );
}
