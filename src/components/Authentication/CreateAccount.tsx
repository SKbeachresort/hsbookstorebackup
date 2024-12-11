"use client";
import React from "react";
import { AuthLoginUI } from "../Auth/AuthLoginUI";

interface CreateAccountProps {
  channel: string;
  locale: string;
  closeModal: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  closeModal,
  channel,
  locale,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg  relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <AuthLoginUI channel={channel} locale={locale} />
    </div>
  );
};

export default CreateAccount;