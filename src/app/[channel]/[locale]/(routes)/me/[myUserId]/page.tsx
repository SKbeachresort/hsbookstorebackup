"use client";
import React,{ useTransition, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { userLogout } from "@/server/userLogout";
import BackDropLoader from "@/app/elements/BackdropLoader";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import toast from "react-hot-toast";

const MyProfilePage = () => {
  const { user, loading } = useUser();
  const [isPending, startTransition] = useTransition();
  const { signOut } = useSaleorAuthContext();

  const [isloading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    startTransition(() => {
      userLogout()
        .then(() => {
          setIsLoading(false);
          signOut();
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("we could not log you out, Please try again later.")
        })
    })
    return;
  };
  
  return (
    <div>
      <div>
        <div>
          <p className="">Welcome {user?.firstName}{" "}{user?.lastName}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;