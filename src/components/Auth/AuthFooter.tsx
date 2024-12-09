import React from "react";
import Link from "next/link";
import { getRegionUrl } from "@/utils/regionUrl";

interface AuthFooterProps {
    channel: string;
    locale: string;
};

export const AuthFooter:React.FC<AuthFooterProps> = ({channel, locale}) => {
  return (
    <div>
      <div className="text-xs text-gray-500 mt-4 text-center">
        By Login or Signup to HSBookstore you agree with our{" "}
        <p>
          <Link
            href={getRegionUrl(channel, locale, `/legal/terms-and-conditions`)}
            className="text-secondary underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <a href="#" className="text-secondary underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};