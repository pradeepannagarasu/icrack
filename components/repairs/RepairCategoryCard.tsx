"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cardHover } from "@/lib/animations";
import RepairTimeBadge from "@/components/ui/RepairTimeBadge";
import WarrantyBadge from "@/components/ui/WarrantyBadge";
import { getRepairImage } from "@/lib/deviceImages";

interface RepairCategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  ctaText?: string;
  duration?: string;
  warranty?: string;
  repairTypeId?: string; // For getting repair-specific images
}

export default function RepairCategoryCard({
  icon: Icon,
  title,
  description,
  href,
  ctaText = "View Repair",
  duration,
  warranty,
  repairTypeId,
}: RepairCategoryCardProps) {
  // Always show image - use repair-specific image or fallback
  const repairImage = repairTypeId ? getRepairImage(repairTypeId) : "/images/mobile.png";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="rest"
      variants={cardHover}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-neutral-200 h-full flex flex-col group cursor-pointer overflow-hidden"
    >
      <Link href={href} className="flex flex-col h-full">
        {/* Repair Image Section - Always Show */}
        <div className="relative h-32 sm:h-36 md:h-40 bg-white rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden -mx-4 sm:-mx-6 -mt-4 sm:-mt-6">
          <Image
            src={repairImage}
            alt={title}
            width={300}
            height={300}
            className="object-contain w-full h-full p-4 sm:p-6 group-hover:scale-110 transition-transform duration-300"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            unoptimized
          />
        </div>

        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
          </motion.div>
        </div>

        <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {duration && <RepairTimeBadge duration={duration} />}
          {warranty && <WarrantyBadge warranty={warranty} />}
        </div>

        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 text-primary-600 font-semibold text-xs sm:text-sm hover:text-primary-700 transition-colors mt-auto">
          <span>{ctaText}</span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

