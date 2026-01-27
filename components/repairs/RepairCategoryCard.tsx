\"use client\";

import { motion } from \"framer-motion\";
import Link from \"next/link\";
import { LucideIcon, ArrowRight } from \"lucide-react\";
import { cardHover } from \"@/lib/animations\";
import RepairTimeBadge from \"@/components/ui/RepairTimeBadge\";
import WarrantyBadge from \"@/components/ui/WarrantyBadge\";

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

function getRepairEmoji(repairTypeId?: string): string {
  switch (repairTypeId) {
    case "screen":
      return "📱";
    case "battery":
      return "🔋";
    case "camera":
      return "📷";
    case "charging-port":
      return "🔌";
    case "water-damage":
      return "💧";
    case "diagnostics":
      return "🩺";
    case "speaker":
      return "🔊";
    case "software":
      return "💻";
    case "back-glass":
      return "🪞";
    default:
      return "🛠️";
  }
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
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="rest"
      variants={cardHover}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-neutral-200 h-full flex flex-col group cursor-pointer overflow-hidden"
    >
      <Link href={href} className="flex flex-col h-full">
        {/* Repair Emoji Icon Section */}
        <div className="relative h-24 sm:h-28 md:h-32 bg-white rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 -mx-2 sm:-mx-4 -mt-2 sm:-mt-4">
          <span className="text-4xl sm:text-5xl md:text-6xl">
            {getRepairEmoji(repairTypeId)}
          </span>
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

