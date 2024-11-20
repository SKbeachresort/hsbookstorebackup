import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckOutStepperProps {
  steps: string[];
  currentStep: number;
}

const CheckOutStepper: React.FC<CheckOutStepperProps> = ({
  steps,
  currentStep,
}) => {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex justify-between items-center mx-auto my-6">
      
      {steps.map((step, index) => {
        const isCompleted = isLastStep ? true : index < currentStep;
        const isActive = isLastStep ? false : index === currentStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Step Indicator */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isCompleted
                  ? "bg-secondary text-white"
                  : isActive
                  ? "bg-white border-2 border-secondary text-blue-500"
                  : "bg-disableGray text-white"
              }`}
            >
              {index + 1}
            </div>

            {index < steps.length - 1 && (
              <div className="absolute -z-30 top-4 left-[50%] w-full h-[0.1rem] bg-gray-200" />
            )}

            {/* Step Label */}
            <p
              className={`mt-2 text-sm ${
                isActive
                  ? "font-bold text-secondary"
                  : isLastStep && index === steps.length - 1
                  ? "font-bold text-secondary"
                  : ""
              }`}
            >
              {step}
            </p>

            {/* Step Line */}

            {index < steps.length - 1 && (
              <motion.div
                className="absolute -z-20 top-4 left-[50%] h-[0.1rem]"
                initial={{ width: "0%", backgroundColor: "#e0e0e0" }}
                animate={{
                  width: isCompleted ? "100%" : "0%",
                  backgroundColor: isCompleted ? "#2C9CDB" : "#e0e0e0",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              ></motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckOutStepper;