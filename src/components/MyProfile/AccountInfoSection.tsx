"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useAddressUser } from "@/hooks/getUserAddress";
import Image from "next/image";
import avatar from "../../../public/avatar.png";
import Loader from "@/app/elements/Loader";
import { use } from "i18next";
import Modal from "@/app/elements/Modal";
import AddressFormUpdate from "./AddressFormUpdate";
import AddressFormCreate from "./AddressFormCreate";
import toast from "react-hot-toast";

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

import { useAddressDeleteMutation } from "../../../gql/graphql";

export const AccountInfoSection = () => {
  const { user, loading } = useUser();
  const [addressformUpdate, setAddressFormUpdate] = useState(false);
  const [addressformCreate, setAddressFormCreate] = useState(false);

  const [selectAddress, setSelectAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const openModalAddressCreate = () => {
    setAddressFormCreate(true);
  };

  const closeModalAddressCreate = () => {
    setAddressFormCreate(false);
  };

  const openModal = (address: any = null) => {
    setSelectAddress(address);
    setAddressFormUpdate(true);
  };

  const closeModal = () => setAddressFormUpdate(false);

  const {
    userAddress,
    userAddresses,
    userDefaultBillingAddress,
    userDefaultShippingAddress,
    refetchUserAddresses,
  } = useAddressUser();

  const [addressDelete, { loading: deleteLoading }] = useAddressDeleteMutation({
    onCompleted: (data) => {
      if (data?.accountAddressDelete?.errors?.length === 0) {
        toast.success("Address Deleted Successfully");
        refetchUserAddresses();
      } else {
        toast.error(`${data?.accountAddressDelete?.errors[0]?.message}`);
      }
    },
  });

  const handleDelete = () => {
    if (addressToDelete) {
      addressDelete({ variables: { id: addressToDelete } });
      setAddressToDelete(null);
    };
  };

  if (loading) {
    return <Loader />;
  };

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

            <button
              onClick={openModalAddressCreate}
              className="my-4 w-fit hover:scale-105 transition-all duration-200 bg-secondary text-white font-medium  px-4 py-2"
            >
              Add New Address
            </button>
          </div>

          <div className="flex flex-col ">
            <div className="mb-2">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-md md:text-lg font-semibold text-textColor">
                  Default Shipping Address
                </h1>

                {userDefaultShippingAddress && (
                  <div className="flex flex-row gap-3">
                    <button
                      onClick={() => openModal(userDefaultShippingAddress)}
                      className="text-sm bg-secondary text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setAddressToDelete(
                          userDefaultShippingAddress?.id ?? null
                        )
                      }
                      className="text-sm bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {userDefaultShippingAddress ? (
                <>
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
                </>
              ) : (
                <>
                  <p>You don't have any Default Address setted</p>
                </>
              )}
            </div>

            <div className="my-2">
              <div className="flex flex-row justify-between gap-x-4 items-center">
                <h1 className="text-md md:text-lg font-semibold text-textColor">
                  Default Billing Address
                </h1>
                {userDefaultBillingAddress && (
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => openModal(userDefaultBillingAddress)}
                      className="text-sm bg-secondary text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        openModal(userDefaultBillingAddress?.id ?? null)
                      }
                      className="text-sm bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {userDefaultBillingAddress ? (
                <>
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
                </>
              ) : (
                <p>You don't have any Default Address setted</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 mb-10">
        <h1 className="text-lg font-semibold text-textColor my-2">
          Your Saved Addresses
        </h1>

        {userAddresses?.map((address) => (
          <div
            key={address.id}
            className="flex flex-row my-3 justify-between items-start p-3 border-[1px] border-[#cdcdcd] bg-white shadow-sm"
          >
            <div>
              <p className="text-sm font-medium mt-1">
                {address?.firstName} {address?.lastName}, {address?.companyName}
                ,
              </p>
              <p className="text-sm mt-1">
                {address?.streetAddress1} {address?.streetAddress2}{" "}
                {address?.city} {address?.countryArea}{" "}
                {address?.country?.country}
              </p>
              <p className="text-sm mt-1">
                {address?.postalCode} ,{address?.phone}
              </p>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <button
                onClick={() => openModal(address)}
                className="text-md border-2 border-secondary text-secondary px-2 py-1 rounded-md"
              >
                Edit
              </button>
              <AlertDialogTrigger
                onClick={() => setAddressToDelete(address?.id ?? null)}
                className="border-2 border-red-400 text-red-500 px-2 py-1 rounded-md"
              >
                Delete
              </AlertDialogTrigger>

              <button className="border-2 border-success text-md px-2 py-1 text-success rounded-md">
                Set as Default
              </button>
            </div>
          </div>
        ))}

        {userAddresses?.length === 0 && (
          <p className="text-center text-gray-500">No Address Found</p>
        )}

      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete Address
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* Modal Open */}
      <Modal isOpen={addressformUpdate} onClose={closeModal}>
        <AddressFormUpdate
          closeModal={closeModal}
          addressData={selectAddress}
        />
      </Modal>

      <Modal isOpen={addressformCreate} onClose={closeModalAddressCreate}>
        <AddressFormCreate closeModal={closeModalAddressCreate} />
      </Modal>
    </AlertDialog>
  );
};
