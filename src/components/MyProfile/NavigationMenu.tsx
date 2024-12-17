"use client";
import React, { useTransition, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { userLogout } from "@/server/userLogout";
import BackDropLoader from "@/app/elements/BackdropLoader";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

const NavigationMenu = () => {
  const { user, loading } = useUser();
  const [isPending, startTransition] = useTransition();
  const { signOut } = useSaleorAuthContext();
  const { getRegionUrl } = useRegionUrl();

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
          toast.error("we could not log you out, Please try again later.");
        });
    });
    return;
  };

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12">
      <div className="border-b-2 border-borderColor p-4">
        <div className="my-2 flex flex-row justify-between items-center">
          <div>
            <p className="text-md lg:text-xl font-medium">
              Welcome {user?.firstName}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex flex-row gap-x-6 items-center">
              <Link href={getRegionUrl(`/me/${user?.id}/orders`)}>
                <p className="text-md font-medium">My Orders</p>
              </Link>
              <Link href={getRegionUrl(`/me/${user?.id}/wishlist`)}>
                <p className="text-md font-medium">My Wishlist</p>
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="text-sm lg:text-md text-white bg-red-500 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex flex-row justify-between items-center">
            <Link href={`/`}>
              <p className="text-md font-medium">My Orders</p>
            </Link>
            <Link href={`/`}>
              <p className="text-md font-medium">My Wishlist</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
