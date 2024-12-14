"use client";
import React, { useState } from "react";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
// import Button from "@/app/elements/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/app/elements/InputField";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import { VerifyOTP } from "./VerifyOTP";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useAccountRegisterMutation } from "../../../gql/graphql";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface AuthRegisterUIProps {
  channel: string;
  locale: string;
};

interface RegisterFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const AuthRegisterUI: React.FC<AuthRegisterUIProps> = ({ channel, locale }) => {
  const [register, { loading, data, error }] = useAccountRegisterMutation();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [phone, setPhone] = useState<string>("");

  const openModal = () => setIsOtpModalOpen(true);
  const closeModal = () => setIsOtpModalOpen(false);

  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const { reset } = form;

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    };

    console.log("Registering User:", data);

    setPhone(data.phone);

    try {
      const response = await register({
        variables: {
          input: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            phoneNumber: data.phone,
            phoneNumberOptional: false,
            redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/${channel}/${locale}/auth/account-confirm`,
            channel: channel,
          },
        },
      });

      const errors = response.data?.accountRegister?.errors;
      // toast.success("Testings")

      if (errors && errors.length > 0) {
        // Handle errors
        console.error(
          "Registration Errors:",
          response.data?.accountRegister?.errors
        );
        toast.error(`${errors[0].message}`);
      } else {
        console.log(
          "User Registered Successfully:",
          response.data?.accountRegister?.user
        );
        toast.success(
          "OTP has been sent to your phone number. Please verify your account."
        );
        reset();
        openModal();
      };
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-[90%] mx-auto md:w-[50%] rounded-xl shadow- p-4 lg:w-[40%] my-6 xl:w-[28%]">
        <div className="flex flex-col items-center mb-4">
          <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
          <h2 className="text-md font-semibold my-2">Create Account</h2>
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
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-3">
              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-3">
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        country={"kw"}
                        onChange={(value) => field.onChange(`+${value}`)}
                        placeholder="Enter Phone Number"
                        inputClass="w-full"
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

            <div className="my-3">
              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textgray">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        isPassword={true}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Checkbox */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2 my-3">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel
                      className="font-normal text-xs text-textgray"
                      htmlFor="terms"
                    >
                      Send me emails about new arrivals, hot items, daily
                      savings, and more.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {loading ? <Loader /> : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>

      {/* OTP Modal */}
      <Modal isOpen={isOtpModalOpen} onClose={closeModal}>
        <VerifyOTP 
          phone={phone} 
          closeModal={closeModal} 
          channel={channel} 
          locale={locale}
        />
      </Modal>
    </div>
  );
};

export default AuthRegisterUI;