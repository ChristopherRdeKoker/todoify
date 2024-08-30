"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDefaultValues, LoginSchema } from "@/api/login/loginSchema";
import { Paperback } from "@/components/Paperback";
import { FormProvider, useForm } from "react-hook-form";
import { RHFtextfield } from "@/components/RHFTextfield";
import { Button } from "@/components/Button";
import { loginMutation } from "./action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formMethods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  const handleReset = () => formMethods.reset();
  const handleSubmit = formMethods.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const result = await loginMutation(data);
      if (result?.error) return console.log(result?.error);
      router.push(`./${result?.user?.id}/homepage`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onReset={handleReset}
        onSubmit={handleSubmit}
        className="w-[21rem] flex flex-col gap-4"
      >
        <Paperback>
          <h1 className="text-2xl underline">Login Page</h1>
          <RHFtextfield title="Username:" name="username" />
          <RHFtextfield type="password" title="Password:" name="password" />
          {!isSubmitting ? (
            <div className="flex flex-row gap-4">
              <Button
                type="reset"
                variant="reset"
                title="Reset"
                onClick={handleReset}
              />
              <Button
                disabled={formMethods.formState?.isLoading}
                variant="primary"
                type="submit"
                title="Submit"
                onClick={handleSubmit}
              />
            </div>
          ) : (
            <p className="text-center font-bold">Loading...</p>
          )}
        </Paperback>
      </form>
    </FormProvider>
  );
}
