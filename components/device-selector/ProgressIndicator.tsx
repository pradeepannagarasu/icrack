"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: string;
  selectedBrand?: string;
  selectedModel?: string;
  selectedRepair?: string;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  selectedBrand,
  selectedModel,
  selectedRepair,
}: ProgressIndicatorProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex();
  };

  const isStepActive = (stepId: string) => {
    return stepId === currentStep;
  };

  const getStepLabel = (step: Step) => {
    switch (step.id) {
      case "brand":
        return selectedBrand || step.label;
      case "model":
        return selectedModel || step.label;
      case "repair":
        return selectedRepair || step.label;
      default:
        return step.label;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(index);
          const isActive = isStepActive(step.id);
          const stepLabel = getStepLabel(step);

          return (
            <div key={step.id} className="flex-1 flex items-center">
              <div className="flex items-center w-full">
                {/* Connector Line (before) */}
                {index > 0 && (
                  <div
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      isCompleted ? "bg-primary-600" : "bg-neutral-200"
                    }`}
                  />
                )}

                {/* Step Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary-600 border-primary-600"
                      : isActive
                      ? "bg-primary-50 border-primary-600"
                      : "bg-white border-neutral-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <span
                      className={`text-sm md:text-base font-semibold ${
                        isActive ? "text-primary-600" : "text-neutral-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Connector Line (after) */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      isCompleted ? "bg-primary-600" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Current Step Label */}
      <div className="text-center mt-4">
        <p className="text-sm md:text-base font-semibold text-neutral-900">
          {getStepLabel(steps[getCurrentStepIndex()])}
        </p>
      </div>
    </div>
  );
}

