"use client";

import { CreditCard, Star, Home } from "lucide-react";

const announcements = [
  {
    id: 1,
    text: "Buy your phones using Klarna with flexible instalments",
    icon: CreditCard,
    color: "text-primary-600",
  },
  {
    id: 2,
    text: "Trusted Trustpilot rating of 4.8+",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    id: 3,
    text: "Call out services at your doorstep",
    icon: Home,
    color: "text-accent-600",
  },
];

export default function AnnouncementTicker() {
  // Duplicate announcements for seamless loop
  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-gradient-to-r from-primary-50 via-accent-50 to-primary-50 border-t border-b border-primary-200/50 overflow-hidden relative h-9 sm:h-10">
      <div className="flex items-center h-full">
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 whitespace-nowrap">
          {duplicatedAnnouncements.map((announcement, index) => {
            const Icon = announcement.icon;
            return (
              <div
                key={`${announcement.id}-${index}`}
                className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6"
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${announcement.color} flex-shrink-0`} />
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                  {announcement.text}
                </span>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary-400" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

