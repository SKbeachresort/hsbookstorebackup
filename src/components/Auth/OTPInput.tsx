"use client";
import React, { useRef, ChangeEvent } from "react";

interface OtpInputProps {
  otp: string[];
  onChange: (value: string[], index: number) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ otp, onChange }) => {
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      onChange(newOtp, index);

      // Move focus to next input if not the last one
      if (index < otp.length - 1) {
        otpRefs[index + 1].current?.focus();
      }
    } else if (value === "" && otp[index] !== "") {
      // Handle backspace or deletion
      const newOtp = [...otp];
      newOtp[index] = "";
      onChange(newOtp, index);

      // Move focus to previous input if not the first one
      if (index > 0) {
        otpRefs[index - 1].current?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={otpRefs[index]}
          type="text"
          placeholder="*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          className="w-12 h-12 text-center text-md rounded-md border-[1px] focus:border-secondary focus:border-2 border-textgray focus:outline-none bg-transparent text-primary"
        />
      ))}
    </div>
  );
};

export default OtpInput;
