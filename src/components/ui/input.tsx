import * as React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  isPassword?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPassword, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full mb-4">
        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            isPassword && "pr-10", // Add padding for the icon
            className
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };