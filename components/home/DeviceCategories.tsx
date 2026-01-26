"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, Tablet, Laptop } from "lucide-react";
import Image from "next/image";
import { categoryImages } from "@/lib/deviceImages";

interface DeviceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
}

const deviceCategories: DeviceCategory[] = [
  {
    id: "phones",
    name: "Phones",
    icon: Smartphone,
    image: categoryImages.phones,
    description: "Professional phone repairs for all major brands",
  },
  {
    id: "tablets",
    name: "iPads",
    icon: Tablet,
    image: categoryImages.tablets,
    description: "Expert iPad repair and screen replacement",
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
    image: categoryImages.laptops,
    description: "Comprehensive laptop repair services",
  },
];

export default function DeviceCategories() {
  return (
    <section className="py-8 sm:py-12 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
            Devices and brands we repair
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {deviceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  {/* Device Image - White Background with Consistent Sizing */}
                  <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={400}
                      className="object-contain w-full h-full p-4 sm:p-6 lg:p-8 group-hover:scale-105 transition-transform duration-300"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 sm:mb-6 text-xs sm:text-sm">
                      {category.description}
                    </p>
                    <Link
                      href={
                        category.id === "phones"
                          ? "/select-device"
                          : category.id === "tablets"
                          ? "/repairs/tablets"
                          : "/repairs/laptops"
                      }
                      className="inline-block w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-700 transition-all hover:shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Logos */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-2xl font-bold text-neutral-900">Apple</div>
          <div className="text-2xl font-bold text-neutral-900">SAMSUNG</div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-bold" style={{ color: "#4285F4" }}>G</span>
            <span className="text-2xl font-bold" style={{ color: "#EA4335" }}>o</span>
            <span className="text-2xl font-bold" style={{ color: "#FBBC05" }}>o</span>
            <span className="text-2xl font-bold" style={{ color: "#4285F4" }}>g</span>
            <span className="text-2xl font-bold" style={{ color: "#34A853" }}>l</span>
            <span className="text-2xl font-bold" style={{ color: "#EA4335" }}>e</span>
          </div>
        </div>
      </div>
    </section>
  );
}

