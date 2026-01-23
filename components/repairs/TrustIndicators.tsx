"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Award, CheckCircle2 } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    title: "12-Month Warranty",
    description: "On all repairs",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Most repairs completed in hours",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Expert repair specialists",
  },
  {
    icon: CheckCircle2,
    title: "Quality Parts",
    description: "Genuine and premium components",
  },
];

export default function TrustIndicators() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {indicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <motion.div
            key={indicator.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 border border-neutral-200 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="font-semibold text-neutral-900 text-sm mb-1">
              {indicator.title}
            </h4>
            <p className="text-neutral-600 text-xs">
              {indicator.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

