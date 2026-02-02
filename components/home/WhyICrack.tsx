"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Gem, Award, Users, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Express Repairs",
    description: "Fast turnaround times",
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "12 months on most repairs, 24 months on batteries",
  },
  {
    icon: Gem,
    title: "Quality Parts",
    description: "Premium components only",
  },
  {
    icon: Award,
    title: "Qualified Experts",
    description: "Certified technicians",
  },
  {
    icon: Users,
    title: "Over 1M Happy Customers",
    description: "Trusted by thousands",
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    description: "Sustainable practices",
  },
];

export default function WhyICrack() {
  return (
    <section className="py-8 sm:py-12 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-700 mb-4 sm:mb-6">
            Why iCrack?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 max-w-3xl mx-auto px-2">
            iCrack specialises in offering an express repair service for smartphones, tablets and computers along with refurbished devices. Since launching, iCrack has grown to multiple repair shops and counting! We pride ourselves on offering an express repair service powered by our iCrack accredited technicians, on-site at each of our shops, with up to 24 months' warranty on selected repairs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 text-xs sm:text-sm md:text-base">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 text-[10px] sm:text-xs md:text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

