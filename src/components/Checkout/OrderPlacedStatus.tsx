"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { getCookie } from "cookies-next";
import ordersuccess from "../../../public/orderplaced.json";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface OrderPlacedStatusProps {
  orderId?: string | null;
};

const OrderPlacedStatus: React.FC<OrderPlacedStatusProps> = ({ orderId }) => {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(10);

  const { user } = useUser();
  const guest_email = localStorage.getItem("guestEmail");

  const email = user?.email || guest_email;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(`/`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);


  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <Lottie
        animationData={ordersuccess}
        loop={false}
        className="w-52 mx-auto"
      />
      <h1 className="text-xl fon-bold text-center my-2">
        Thank you for shopping with us!
      </h1>
      <p className="text-md my-2">
        Order Number <span className="font-semibold">#{orderId}</span> has been
        placed successfully
      </p>
      <p className="text-sm">
        We will send you an email confirmation email to {email} shortly{" "}
      </p>
      <p className="text-sm my-2">
        Redirecting to Home page in{" "}
        <span className="text-secondary font-bold">{timer}s</span> seconds
      </p>
    </div>
  );
};

export default OrderPlacedStatus;