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
import { useParams } from "next/navigation";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRequestPasswordChangeMutation } from "../../../../../../../gql/graphql";
import Loader from "@/app/elements/Loader";

interface ForgotPasswordInputs {
  email: string;
}

const ForgotPassword = () => {
  const { channel, locale } = useParams();

  const form = useForm<ForgotPasswordInputs>({
    defaultValues: {
      email: "",
    },
  });

  const [requestPasswordChange, { loading: requestPasswordLoading }] =
    useRequestPasswordChangeMutation();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      const response = await requestPasswordChange({
        variables: {
          email: data.email,
          channel: channel as string,
          redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/${channel}/${locale}/auth/reset-password`,
        },
      });
      
      console.log("Request Password Change Success", response);
      
      if (
        response?.data?.requestPasswordReset?.errors &&
        response?.data?.requestPasswordReset?.errors.length > 0
      ) {
        toast.error(
          `${response?.data?.requestPasswordReset?.errors[0].message}`
        );
        return;
      } else {
        toast.success("Password reset link has been sent to your email");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div className="w-[90%] mx-auto md:w-[50%] my-10 rounded-xl shadow-md p-4 lg:w-[40%] xl:w-[28%]">
      
      <h1 className="text-xl text-center font-semibold my-3">
        Forgot Password
      </h1>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your Email"
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
                {requestPasswordLoading ? <Loader /> : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </Form>

        <AuthFooter 
          channel={channel as string} 
          locale={locale as string} 
        />

      </div>
    </div>
  );
};

export default ForgotPassword;