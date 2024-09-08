"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDefaultValues, LoginSchema } from "@/app/api/login/loginSchema";
import { Paperback } from "@/components/Paperback";
import { FormProvider, useForm } from "react-hook-form";
import { RHFtextfield } from "@/components/RHFTextfield";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LoginHandler } from "./action";
import { getErrorMessage } from "./auth.config";
// import { getErrorMessage } from "@/auth.config";
// import { getErrorMessage } from "./auth.config";

export function LoginForm() {
  const [isError, setIsError] = useState("");

  const formMethods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { ...LoginDefaultValues, password: "123456", username: "chris" },
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    try {
      const response = await LoginHandler(data);

      if (!!response?.data?.error?.length) {
        throw new Error(response?.data?.error);
      }
    } catch (error) {
      const getMessage = getErrorMessage(error);

      setIsError(getMessage);
      // setTimeout(() => {
      //   setIsError("");
      // }, 12000);
    }
  });

  const handleReset = () => formMethods.reset();
  return (
    <FormProvider {...formMethods}>
      <form onReset={handleReset} onSubmit={handleSubmit} className="w-[21rem] flex flex-col gap-4">
        <Paperback>
          {/* <pre>{JSON.stringify(formMethods.watch(), null, 2)}</pre> */}
          {!!isError?.length && <p className="text-red-400">{isError}</p>}

          <h1 className="text-2xl underline">Login Page</h1>
          <RHFtextfield title="Username:" name="username" />
          <RHFtextfield type="password" title="Password:" name="password" />
          <div className="flex flex-row gap-4">
            <Button type="reset" variant="reset" title="Reset" onClick={handleReset} />
            <Button
              disabled={formMethods.formState?.isLoading}
              variant="primary"
              type="submit"
              title="Submit"
              onClick={handleSubmit}
            />
          </div>
        </Paperback>
      </form>
    </FormProvider>
  );
}
