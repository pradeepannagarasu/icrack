"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Brand, Model, RepairType } from "@/types";

interface BookingStepProps {
  brand: Brand;
  model: Model;
  repair: RepairType;
  onBook: () => void;
}

export default function BookingStep({
  brand,
  model,
  repair,
  onBook,
}: BookingStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
          Ready to Book?
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 mb-8">
          Review your selection and proceed to booking
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 md:p-8 border-2 border-neutral-200 shadow-lg mb-8"
      >
        <h3 className="text-xl md:text-2xl font-display font-semibold text-neutral-900 mb-6">
          Repair Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-neutral-100">
            <span className="text-neutral-600 font-medium">Brand:</span>
            <span className="font-semibold text-neutral-900 text-lg">
              {brand.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-neutral-100">
            <span className="text-neutral-600 font-medium">Device:</span>
            <span className="font-semibold text-neutral-900 text-lg">
              {model.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-neutral-100">
            <span className="text-neutral-600 font-medium">Repair:</span>
            <span className="font-semibold text-neutral-900 text-lg">
              {repair.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-neutral-600 font-medium">Duration:</span>
            <span className="font-semibold text-primary-600 text-lg">
              {repair.duration}
            </span>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBook}
          className="flex-1 px-8 py-4 md:py-5 bg-primary-600 text-white rounded-xl font-semibold text-lg md:text-xl hover:bg-primary-700 transition-all hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <span>Continue to Booking</span>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}

