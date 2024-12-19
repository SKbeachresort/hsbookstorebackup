"use client";
import React, { useTransition, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { userLogout } from "@/server/userLogout";
import BackDropLoader from "@/app/elements/BackdropLoader";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import toast from "react-hot-toast";
import { AccountInfoSection } from "@/components/MyProfile/AccountInfoSection";
import NavigationMenu from "@/components/MyProfile/NavigationMenu";

const MyProfilePage = () => {
  
  // const { user, loading } = useUser();
  // const [isPending, startTransition] = useTransition();
  // const { signOut } = useSaleorAuthContext();

  // const [isloading, setIsLoading] = useState(false);

  // const handleLogout = () => {
  //   setIsLoading(true);
  //   startTransition(() => {
  //     userLogout()
  //       .then(() => {
  //         setIsLoading(false);
  //         signOut();
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //         toast.error("we could not log you out, Please try again later.");
  //       });
  //   });
  //   return;
  // };

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12">
      <AccountInfoSection />
    </div>
  );
};

export default MyProfilePage;