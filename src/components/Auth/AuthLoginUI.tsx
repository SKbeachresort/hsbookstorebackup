"use client";
import React, { useState } from "react";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
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
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { IoArrowBackOutline } from "react-icons/io5";

interface AuthLoginUIProps {
  channel: string;
  locale: string;
};

interface LoginFormInputs {
  email: string;
  password: string;
};

interface GuestFormInputs {
  email: string;
};

export const AuthLoginUI: React.FC<AuthLoginUIProps> = ({
  channel,
  locale,
}) => {

  const router = useRouter();
  const currentPath = usePathname();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [login, { loading, data, error }] = useUserTokenCreateMutation();

  const [showGuestCheckout, setShowGuestCheckout] = useState(false);

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const guestForm = useForm<GuestFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  const { reset } = form;
  const { reset: resetGuestForm } = guestForm;

  const onSubmitGuestCheckout: SubmitHandler<GuestFormInputs> = (data) => {
    localStorage.setItem("guestEmail", data.email);
    console.log("Guest Email Entered:", data.email);
    router.push(getRegionUrl(channel, locale, `checkout`));
  };

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
        if (token) {
          setCookie("accessToken", token, { maxAge: 7 * 24 * 60 * 60 });
          localStorage.setItem("accessToken", token);
        }

        if (userId) {
          if (currentPath.includes("/cart")) {
            toast.success("Login successful");
            setIsAuthenticated(true);
            window.location.reload();
          } else {
            const profileUrl = getRegionUrl(channel, locale, `me/${userId}`);
            router.replace(profileUrl);
            toast.success("Login successful");
            setIsAuthenticated(true);
          }
        } else {
          toast.error("An error occurred. Please try again.");
        }
        reset();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <>
      {!showGuestCheckout ? (
        <div>
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
            <CustomButton
              variant="secondary"
              onClick={() => setShowGuestCheckout(true)}
            >
              Guest Checkout
            </CustomButton>
          </div>

          <AuthFooter channel={channel} locale={locale} />
        </div>
      ) : (
        <>
          <div className="absolute top-10 z-20">
            <button
              onClick={() => setShowGuestCheckout(false)}
            >
              <IoArrowBackOutline className="text-secondary text-xl"/>
            </button>
          </div>

          <div className="flex flex-col items-center mb-4">
            <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
            <h2 className="text-md font-semibold my-2">
              Guest Checkout
            </h2>
            <p className="text-[0.8rem] w-[80%] mx-auto text-center text-textgray">
              Enter your email to proceed as a guest.
            </p>
          </div>

          <Form {...guestForm}>
            <form onSubmit={guestForm.handleSubmit(onSubmitGuestCheckout)}>
              <div className="my-3">
                {/* Email Field */}
                <FormField
                  control={guestForm.control}
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

              <Button type="submit" className="w-full">
                {loading ? <Loader /> : "Proceed"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};