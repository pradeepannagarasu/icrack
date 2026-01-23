"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { Brand } from "@/types";
import { getBrandImage } from "@/lib/deviceImages";
import { DeviceCategory, getBrandsByCategory } from "@/lib/categoryFilters";

interface BrandStepProps {
  onSelect: (brand: Brand) => void;
  category?: DeviceCategory;
}

export default function BrandStep({ onSelect, category }: BrandStepProps) {
  const brands = category ? getBrandsByCategory(category) : (require("@/data/brands.json").brands as Brand[]);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
          Choose Your Brand
        </h2>
        <p className="text-lg text-neutral-600">
          Select the brand of your device
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.map((brand, index) => (
          <motion.button
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(brand)}
            className="p-6 bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={getBrandImage(brand.id)}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  unoptimized
                />
              </div>
              <span className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-center text-sm">
                {brand.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

