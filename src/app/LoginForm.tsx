"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDefaultValues, LoginSchema } from "@/api/login/loginSchema";
import { Paperback } from "@/components/Paperback";
import { FormProvider, useForm } from "react-hook-form";
import { RHFtextfield } from "@/components/RHFTextfield";
import { Button } from "@/components/Button";
import { loginMutation } from "./action";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const { pending } = useFormStatus();
  const router = useRouter();

  const formMethods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  const handleReset = () => formMethods.reset();
  const handleSubmit = formMethods.handleSubmit(async (data) => {
    try {
      const result = await loginMutation(data);
      console.log("result", result);
      if (result?.error) {
      } else if (result?.success) {
        router.push(`/${result?.user?.id}/homepage`);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  });
  return (
    <FormProvider {...formMethods}>
      <form className="w-[30rem] flex flex-col gap-4">
        <Paperback>
          <h1 className="text-2xl underline">Login Page</h1>
          <RHFtextfield title="Username:" name="username" />
          <RHFtextfield type="password" title="Password:" name="password" />

          <div className="flex flex-row gap-4">
            <Button type="reset" variant="reset" title="Reset" onClick={handleReset} />
            <Button isDisabled={pending} variant="primary" type="submit" title="Submit" onClick={handleSubmit} />
          </div>
        </Paperback>
      </form>
    </FormProvider>
  );
}
