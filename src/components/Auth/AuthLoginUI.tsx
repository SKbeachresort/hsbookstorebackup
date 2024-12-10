"use client";
import React, { useState } from "react";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
// import Button from "@/app/elements/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/app/elements/InputField";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/app/elements/Loader";
import { Button } from "../ui/button";
import { getRegionUrl } from "@/utils/regionUrl";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import toast from "react-hot-toast";
import { useUserTokenCreateMutation } from "../../../gql/graphql";
import { setCookie } from "cookies-next";
import CustomButton from "@/app/elements/Button";
import { useRouter } from "next/navigation";

interface AuthLoginUIProps {
  channel: string;
  locale: string;
};

interface LoginFormInputs {
  email: string;
  password: string;
};

export const AuthLoginUI: React.FC<AuthLoginUIProps> = ({
  channel,
  locale,
}) => {

  const router = useRouter();  
  const [login, { loading, data, error }] = useUserTokenCreateMutation();

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset } = form;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const errors = response.data?.tokenCreate?.errors;

      if (errors && errors.length > 0) {
        toast.error(`${errors[0].message}`);
        reset();
      } else {
        const token = response.data?.tokenCreate?.token;
        const userId = response.data?.tokenCreate?.user?.id;
        // console.log("Token:", token);
        if (token) {
          setCookie("accessToken", token, { maxAge: 7 * 24 * 60 * 60 });
        };
        router.push(getRegionUrl(channel, locale, `/me/${userId}`));
        toast.success("Login Successful");
        reset();
      };
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[90%] mx-auto md:w-[50%] rounded-xl shadow-md p-4 lg:w-[40%] my-6 xl:w-[28%]">
        <div className="flex flex-col items-center mb-4">
          <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
          <h2 className="text-md font-semibold my-2">
            Sign in or create your account
          </h2>
          <p className="text-[0.8rem] w-[80%] mx-auto text-center text-textgray">
            Not sure if you have an account? Enter your email and we’ll check
            for you.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-3">
              {/* Email Field */}
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

            <div className="my-3">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Create Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        isPassword={true}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {loading ? <Loader /> : "Login"}
            </Button>
          </form>
        </Form>

        <Link href={getRegionUrl(channel, locale, `auth/forgot-password`)}>
          <p className="text-center text-sm font-medium underline text-secondary my-2">
            Forgot your password?
          </p>
        </Link>

        <div>
          <Link href={getRegionUrl(channel, locale, `auth/register`)}>
            <CustomButton variant="secondary">Create Account</CustomButton>
          </Link>
        </div>

        <div>
          <Link href={getRegionUrl(channel, locale, `checkout`)}>
            <CustomButton variant="secondary">Guest Checkout</CustomButton>
          </Link>
        </div>

        <AuthFooter channel={channel} locale={locale} />
      </div>
    </div>
  );
};