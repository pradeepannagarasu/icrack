"use client";

import { CheckCircle2 } from "lucide-react";

interface NoFixNoFeeProps {
  className?: string;
  variant?: "inline" | "card";
}

export default function NoFixNoFee({
  className = "",
  variant = "inline",
}: NoFixNoFeeProps) {
  if (variant === "card") {
    return (
      <div
        className={`bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3 ${className}`}
      >
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-900 text-sm mb-1">
            No Fix, No Fee
          </p>
          <p className="text-green-700 text-xs">
            If we can't fix your device, you don't pay. Simple as that.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <CheckCircle2 className="w-4 h-4 text-green-600" />
      <span className="text-sm font-semibold text-green-700">
        No Fix, No Fee
      </span>
    </div>
  );
}

