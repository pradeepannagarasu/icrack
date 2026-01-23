"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, ArrowRight } from "lucide-react";

export default function DeviceSelectorCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 md:p-8 border border-primary-100"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-1">
              Not sure which repair you need?
            </h3>
            <p className="text-neutral-600 text-sm">
              Select your device to see all available repair options
            </p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/book"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-lg"
          >
            <span>Select Device</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

