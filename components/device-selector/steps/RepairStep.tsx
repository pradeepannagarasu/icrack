"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { RepairType } from "@/types";

interface RepairStepProps {
  repairs: RepairType[];
  onSelect: (repair: RepairType) => void;
  selectedRepair: RepairType | null;
}

export default function RepairStep({
  repairs,
  onSelect,
  selectedRepair,
}: RepairStepProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3">
          What Needs Repair?
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Select the repair service you need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {repairs.map((repair, index) => {
          const isSelected = selectedRepair?.id === repair.id;
          return (
            <motion.button
              key={repair.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(repair)}
              className={`p-6 md:p-8 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? "bg-primary-600 border-primary-600 shadow-lg"
                  : "bg-white border-neutral-200 hover:border-primary-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-primary-100 to-accent-100"
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield
                    className={`w-7 h-7 md:w-8 md:h-8 ${
                      isSelected ? "text-white" : "text-primary-600"
                    }`}
                  />
                </motion.div>
                <div className="flex-1">
                  <h3
                    className={`text-xl md:text-2xl font-display font-semibold mb-2 ${
                      isSelected ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {repair.name}
                  </h3>
                  <p
                    className={`text-sm md:text-base mb-4 ${
                      isSelected ? "text-white/90" : "text-neutral-600"
                    }`}
                  >
                    {repair.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
                    <div
                      className={`flex items-center space-x-1 ${
                        isSelected ? "text-white/80" : "text-neutral-600"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{repair.duration}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        isSelected ? "text-white/80" : "text-neutral-600"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{repair.warranty} warranty</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight
                    className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ${
                      isSelected ? "text-white" : "text-neutral-400"
                    }`}
                  />
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

