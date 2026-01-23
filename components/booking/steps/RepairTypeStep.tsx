"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Brand, Model, RepairType } from "@/types";
import repairsData from "@/data/repairs.json";

interface RepairTypeStepProps {
  brand: Brand;
  model: Model;
  onSelect: (repair: RepairType) => void;
}

export default function RepairTypeStep({
  brand,
  model,
  onSelect,
}: RepairTypeStepProps) {
  const repairs = repairsData.repairTypes as RepairType[];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
          What needs repair?
        </h2>
        <p className="text-lg text-neutral-600">
          Select the repair service for your {brand.name} {model.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repairs.map((repair, index) => (
          <motion.button
            key={repair.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(repair)}
            className="p-6 bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-colors flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {repair.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">{repair.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1 text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>{repair.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-neutral-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{repair.warranty} warranty</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

