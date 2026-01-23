"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cardHover } from "@/lib/animations";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="rest"
        variants={cardHover}
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-neutral-100 h-full cursor-pointer"
      >
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
        </motion.div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-semibold text-neutral-900 mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">{description}</p>
        <div className="flex items-center text-primary-600 font-medium text-sm sm:text-base group">
          <span>Learn more</span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

