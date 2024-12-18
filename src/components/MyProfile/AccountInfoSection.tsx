"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useAddressUser } from "@/hooks/getUserAddress";
import Image from "next/image";
import avatar from "../../../public/avatar.png";
import Loader from "@/app/elements/Loader";
import { use } from "i18next";
import Modal from "@/app/elements/Modal";
import AddressForm from "./AddressForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const AccountInfoSection = () => {
  const { user, loading } = useUser();
  const [addressform, setAddressForm] = useState(false);

  const openModal = () => setAddressForm(true);
  const closeModal = () => setAddressForm(false);

  const {
    userAddress,
    userAddresses,
    userDefaultBillingAddress,
    userDefaultShippingAddress,
  } = useAddressUser();
  console.log("User Address", userAddress);

  if (loading) {
    return <Loader />;
  }

  return (
    <AlertDialog>
      <div className="bg-white shadow-md p-1 md:p-6 rounded-lg my-4 mx-auto">
        {/* Profile Picture */}
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex space-x-4">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={avatar}
                  alt="profile-pic"
                  width={100}
                  height={100}
                />
              </div>

              {/* Account Information */}
              <div className="flex-1">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 text-md mt-1">{user?.email}</p>
                <div className="mt-2">
                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                      user?.isActive
                        ? "bg-green-100 text-success"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.isActive ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`ml-2 inline-block text-sm font-medium px-3 py-1 rounded-full ${
                      user?.isConfirmed
                        ? "bg-blue-50 text-secondary"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user?.isConfirmed ? "Confirmed" : "Unconfirmed"}
                  </span>
                </div>
              </div>
            </div>
            <button className="my-4 w-fit hover:scale-105 transition-all duration-200 bg-secondary text-white font-medium  px-4 py-2">
              Add New Address
            </button>
          </div>

          <div className="flex flex-col ">
            <div className="mb-2">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-md md:text-lg font-semibold text-textColor">
                  Default Shipping Address
                </h1>
                <div className="flex flex-row gap-3">
                  <button className="text-sm bg-secondary text-white px-2 py-1 rounded-md">
                    Edit
                  </button>
                  <button className="text-sm bg-red-500 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm mt-1">
                {userDefaultShippingAddress?.firstName}{" "}
                {userDefaultShippingAddress?.lastName},{" "}
                {userAddress?.companyName},
              </p>
              <p className="text-sm mt-1">
                {userDefaultShippingAddress?.streetAddress1}{" "}
                {userDefaultShippingAddress?.streetAddress2}{" "}
                {userDefaultShippingAddress?.city}{" "}
                {userDefaultShippingAddress?.countryArea}{" "}
                {userDefaultShippingAddress?.country?.country}
              </p>
              <p className="text-sm mt-1">
                {userDefaultShippingAddress?.postalCode} ,
                {userDefaultShippingAddress?.phone}
              </p>
            </div>

            <div className="my-2">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-md md:text-lg font-semibold text-textColor">
                  Default Billing Address
                </h1>
                <div className="flex flex-row gap-3">
                  <button className="text-sm bg-secondary text-white px-2 py-1 rounded-md">
                    Edit
                  </button>
                  <button className="text-sm bg-red-500 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm mt-1">
                {userDefaultBillingAddress?.firstName}{" "}
                {userDefaultBillingAddress?.lastName},{" "}
                {userDefaultBillingAddress?.companyName},
              </p>
              <p className="text-sm mt-1">
                {userDefaultBillingAddress?.streetAddress1}{" "}
                {userDefaultBillingAddress?.streetAddress2}{" "}
                {userDefaultBillingAddress?.city}{" "}
                {userDefaultBillingAddress?.countryArea}{" "}
                {userDefaultBillingAddress?.country?.country}
              </p>
              <p className="text-sm mt-1">
                {userDefaultBillingAddress?.postalCode} ,
                {userDefaultBillingAddress?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 mb-10">
        <h1 className="text-lg font-semibold text-textColor my-2">
          Your Saved Addresses
        </h1>

        {userAddresses?.map((address) => (
          <div key={address.id} className="flex flex-row my-3 justify-between items-start p-3 border-[1px] border-[#cdcdcd] bg-white shadow-sm">
            <div>
              <p className="text-sm font-medium mt-1">
                {userDefaultBillingAddress?.firstName}{" "}
                {userDefaultBillingAddress?.lastName},{" "}
                {userDefaultBillingAddress?.companyName},
              </p>
              <p className="text-sm mt-1">
                {userDefaultBillingAddress?.streetAddress1}{" "}
                {userDefaultBillingAddress?.streetAddress2}{" "}
                {userDefaultBillingAddress?.city}{" "}
                {userDefaultBillingAddress?.countryArea}{" "}
                {userDefaultBillingAddress?.country?.country}
              </p>
              <p className="text-sm mt-1">
                {userDefaultBillingAddress?.postalCode} ,
                {userDefaultBillingAddress?.phone}
              </p>
            </div>
            <div className="flex flex-row gap-3 justify-start">
              <button
                onClick={openModal}
                className="text-md border-2 border-secondary text-secondary px-2 py-1 rounded-md"
              >
                Edit
              </button>
              <AlertDialogTrigger>
                <button className="text-md border-2  border-red-500 text-red-500 px-2 py-1 rounded-md">
                  Delete
                </button>
              </AlertDialogTrigger>

              <button className="border-2 border-success text-md px-2 py-1 text-success rounded-md">
                Set as Default
              </button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete Address</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* Modal Open */}
      <Modal isOpen={addressform} onClose={closeModal}>
        <AddressForm closeModal={closeModal}/>
      </Modal>
    </AlertDialog>
  );
};
