"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  isLoading,
  variant = "primary",
}) => {

  const baseStyles =
    "w-full py-2 my-2 flex flex-col justify-center items-center text-center font-semibold rounded-full transition-colors duration-300";
  const primaryStyles =
    "bg-secondary text-white hover:scale-105 transition-all duration-300";
  const secondaryStyles =
    "border border-gray-300 text-gray-700 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${
        variant === "primary" ? primaryStyles : secondaryStyles
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;