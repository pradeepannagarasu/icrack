\"use client\";

import { motion } from \"framer-motion\";
import { Clock, Shield, ArrowRight } from \"lucide-react\";

interface RepairOptionCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  warranty: string;
  repairId: string;
  onClick: () => void;
}

function getRepairEmoji(repairId: string): string {
  switch (repairId) {
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
    case "back-cover":
    case "back-glass":
      return "🪞";
    default:
      return "🛠️";
  }
}

export default function RepairOptionCard({
  id,
  title,
  description,
  duration,
  warranty,
  repairId,
  onClick,
}: RepairOptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group cursor-pointer"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Icon - Emoji inside pink rounded square */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-lg border-2 border-primary-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xl sm:text-2xl">
            {getRepairEmoji(repairId)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-display font-semibold text-neutral-900 mb-1.5 sm:mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4 leading-relaxed">
            {description}
          </p>

          {/* Time and Warranty */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-neutral-600">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-neutral-600">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
              <span>{warranty} warranty</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
        </div>
      </div>
    </motion.button>
  );
}

