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
      {isloading && <BackDropLoader open={loading} />}

      <h1 className="my-3 text-lg font-semibold text-center">
        This is My Profile Page
      </h1>
      <p className="text-center my-2">
        {user?.firstName} {user?.lastName}
      </p>
      <p className="text-center ">{user?.email}</p>

      <button
        onClick={handleLogout}
        className="text-md bg-red-500 mx-auto text-white px-2 py-2"
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default MyProfilePage;