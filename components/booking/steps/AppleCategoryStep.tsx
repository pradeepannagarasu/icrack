"use client";

import { motion } from "framer-motion";
import { Smartphone, Tablet, Laptop } from "lucide-react";
import Image from "next/image";
import { categoryImages } from "@/lib/deviceImages";

interface AppleCategoryStepProps {
  onSelect: (category: "phones" | "ipads" | "laptops") => void;
}

export default function AppleCategoryStep({ onSelect }: AppleCategoryStepProps) {
  const categories = [
    {
      id: "phones" as const,
      name: "iPhone",
      icon: Smartphone,
      image: categoryImages.phones,
      description: "iPhone repairs",
    },
    {
      id: "ipads" as const,
      name: "iPad",
      icon: Tablet,
      image: categoryImages.tablets,
      description: "iPad repairs",
    },
    {
      id: "laptops" as const,
      name: "MacBook",
      icon: Laptop,
      image: categoryImages.laptops,
      description: "MacBook repairs",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
          Choose Your Apple Device
        </h2>
        <p className="text-lg text-neutral-600">
          Select the type of Apple device you need to repair
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(category.id)}
              className="p-8 md:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={128}
                    height={128}
                    className="object-contain w-full h-full p-3 md:p-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <span className="font-bold text-lg md:text-xl text-neutral-900 group-hover:text-primary-600 transition-colors block">
                    {category.name}
                  </span>
                  <span className="text-sm text-neutral-600 mt-1 block">
                    {category.description}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

