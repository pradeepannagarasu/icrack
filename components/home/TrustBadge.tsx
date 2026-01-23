"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cardHover } from "@/lib/animations";

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
}

export default function TrustBadge({ icon: Icon, text }: TrustBadgeProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="rest"
      variants={cardHover}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-100 text-center cursor-pointer"
    >
      <motion.div
        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
      </motion.div>
      <p className="font-semibold text-neutral-900 text-xs sm:text-sm md:text-base">{text}</p>
    </motion.div>
  );
}

