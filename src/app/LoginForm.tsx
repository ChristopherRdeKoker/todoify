"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDefaultValues, LoginSchema } from "@/api/login/loginSchema";

import { Paperback } from "@/components/Paperback";
import { FormProvider, useForm } from "react-hook-form";
import { RHFtextfield } from "@/components/RHFTextfield";
import { Button } from "@/components/Button";

export function LoginForm() {
  const formMethods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  return (
    <FormProvider {...formMethods}>
      <form className="w-[30rem] flex flex-col gap-4">
        <Paperback>
          <h1 className="text-2xl underline">Login Page</h1>
          <RHFtextfield title="Username:" name="username" />
          <RHFtextfield type="password" title="Password:" name="password" />

          <div className="flex flex-row gap-4">
            <Button type="reset" variant="reset" title="Reset" />
            <Button variant="primary" title="Submit" />
          </div>
          <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre>
        </Paperback>
      </form>
    </FormProvider>
  );
}
