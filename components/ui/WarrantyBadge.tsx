"use client";

import { Shield } from "lucide-react";

interface WarrantyBadgeProps {
  warranty: string;
  className?: string;
  variant?: "default" | "large";
}

export default function WarrantyBadge({
  warranty,
  className = "",
  variant = "default",
}: WarrantyBadgeProps) {
  const sizeClasses =
    variant === "large"
      ? "px-4 py-2 text-sm"
      : "px-3 py-1.5 text-xs";

  // Handle "N/A" warranty differently
  const displayText = warranty === "N/A" ? "N/A Warranty" : `${warranty} Warranty`;

  return (
    <div
      className={`inline-flex items-center space-x-1.5 bg-accent-50 text-accent-700 rounded-lg font-semibold ${sizeClasses} ${className}`}
    >
      <Shield className={variant === "large" ? "w-4 h-4" : "w-3.5 h-3.5"} />
      <span>{displayText}</span>
    </div>
  );
}

