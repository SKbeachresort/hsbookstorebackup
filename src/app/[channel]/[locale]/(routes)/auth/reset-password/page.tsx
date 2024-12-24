"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "@/app/elements/Loader";
import { useSearchParams, useRouter } from "next/navigation";

import { useSetPasswordMutation } from "../../../../../../../gql/graphql";

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const decodedEmail = email?.replace("%40", "@");
  console.log("Decoded Email", decodedEmail);
  console.log("Token", token);

  const form = useForm<ResetPasswordInputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [setPassword, { loading: passwordChangeLoading }] =
    useSetPasswordMutation();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (!data.password || !data.confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await setPassword({
        variables: {
          email: decodedEmail as string,
          token: token as string,
          password: data.password,
        },
      });

      const errors = response?.data?.setPassword?.errors;

      if(errors && errors.length > 0) {
        toast.error(`${errors[0].message}`);
        return;
      }else{
        toast.success("Password changed successfully");
      }
    } catch (error) {
      console.error("Password Change Error", error);
    }
  };

  return (
    <div className="w-[90%] mx-auto md:w-[50%] my-10 rounded-xl shadow-md p-4 lg:w-[40%] xl:w-[28%]">
      <h1 className="text-xl text-center font-semibold my-3">Reset Password</h1>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Set New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        isPassword={true}
                        placeholder="Set New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-4">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        isPassword={true}
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-4">
              <Button type="submit" className="w-full">
                {passwordChangeLoading ? <Loader /> : "Change Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
