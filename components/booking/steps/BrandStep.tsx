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

const REPAIR_BRAND_IDS = ["apple", "samsung", "google"];

export default function BrandStep({ onSelect, category }: BrandStepProps) {
  const allBrands = category ? getBrandsByCategory(category) : (require("@/data/brands.json").brands as Brand[]);
  const brands = allBrands.filter((b) => REPAIR_BRAND_IDS.includes(b.id));

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {brands.map((brand, index) => (
          <motion.button
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(brand)}
            className="p-8 md:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all group"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src={getBrandImage(brand.id, category)}
                  alt={brand.name}
                  width={128}
                  height={128}
                  className="object-contain w-full h-full p-3 md:p-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  unoptimized
                />
              </div>
              <span className="font-bold text-lg md:text-xl text-neutral-900 group-hover:text-primary-600 transition-colors text-center">
                {brand.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

