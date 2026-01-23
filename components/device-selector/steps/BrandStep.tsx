"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { Brand } from "@/types";
import { getBrandImage } from "@/lib/deviceImages";

interface BrandStepProps {
  brands: Brand[];
  onSelect: (brand: Brand) => void;
  selectedBrand: Brand | null;
}

export default function BrandStep({
  brands,
  onSelect,
  selectedBrand,
}: BrandStepProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3">
          Select Your Brand
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Choose the brand of your device
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {brands.map((brand, index) => {
          const isSelected = selectedBrand?.id === brand.id;
          return (
            <motion.button
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(brand)}
              className={`p-6 md:p-8 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "bg-primary-600 border-primary-600 shadow-lg"
                  : "bg-white border-neutral-200 hover:border-primary-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center overflow-hidden ${
                    isSelected ? "bg-white/20" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={getBrandImage(brand.id)}
                    alt={brand.name}
                    width={96}
                    height={96}
                    className={`object-contain w-full h-full p-2 transition-opacity ${
                      isSelected ? "opacity-90" : ""
                    }`}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    unoptimized
                  />
                </motion.div>
                <span
                  className={`font-semibold text-base md:text-lg ${
                    isSelected ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {brand.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

