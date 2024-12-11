"use client";
import React from "react";
import { getUserDetails } from "@/hooks/getUser";
import { useLogout } from "@/utils/logout";
import BackDropLoader from "@/app/elements/BackdropLoader";

const MyProfilePage = () => {
  const { user, loading, error } = getUserDetails();
  console.log("User:", user);

  const { logout, isloading } = useLogout();

  const handleLogout = () => {
    logout();
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
        Logout
      </button>
    </div>
  );
};

export default MyProfilePage;