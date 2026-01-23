"use client";

import { Clock } from "lucide-react";

interface RepairTimeBadgeProps {
  duration: string;
  className?: string;
}

export default function RepairTimeBadge({
  duration,
  className = "",
}: RepairTimeBadgeProps) {
  // Convert duration to badge format (e.g., "1-2 hours" -> "60-120 mins")
  const formatDuration = (duration: string): string => {
    if (duration.includes("hour")) {
      const match = duration.match(/(\d+)-?(\d+)?/);
      if (match) {
        const min = parseInt(match[1]) * 60;
        const max = match[2] ? parseInt(match[2]) * 60 : min;
        return max > min ? `${min}-${max} mins` : `${min} mins`;
      }
    }
    return duration;
  };

  const formattedTime = formatDuration(duration);

  return (
    <div
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold ${className}`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>{formattedTime}</span>
    </div>
  );
}

