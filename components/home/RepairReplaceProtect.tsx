"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, RefreshCw, Shield } from "lucide-react";

const services = [
  {
    id: "repair",
    title: "Repair",
    icon: Wrench,
    bgColor: "bg-white",
    iconColor: "text-primary-600",
    textColor: "text-neutral-900",
    buttonText: "Book Now",
    href: "/repairs",
  },
  {
    id: "refurbished",
    title: "Refurbished",
    icon: RefreshCw,
    bgColor: "bg-primary-50",
    iconColor: "text-primary-600",
    textColor: "text-neutral-900",
    buttonText: "Shop iPhones",
    href: "/refurbished",
  },
  {
    id: "protect",
    title: "Protect",
    icon: Shield,
    bgColor: "bg-accent-900",
    iconColor: "text-primary-400",
    textColor: "text-white",
    buttonText: "Learn More",
    href: "/accessories",
  },
];

export default function RepairReplaceProtect() {
  return (
    <section className="py-8 sm:py-12 lg:py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${service.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${service.bgColor === "bg-accent-900" ? "bg-primary-600/20" : "bg-primary-100"} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${service.iconColor}`} />
                  </div>
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 ${service.textColor}`}>
                    {service.title}
                  </h3>
                  <Link
                    href={service.href}
                    className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-700 transition-all hover:shadow-lg text-center`}
                  >
                    {service.buttonText}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

