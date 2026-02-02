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
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3">
          Select Your Brand
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Choose the brand of your device
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full justify-items-center">
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
              className={`w-full max-w-[280px] p-8 md:p-10 rounded-3xl border-2 transition-all ${
                isSelected
                  ? "bg-primary-600 border-primary-600 shadow-xl"
                  : "bg-white border-neutral-200 hover:border-primary-300 hover:shadow-xl"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm ${
                    isSelected ? "bg-white/20" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={getBrandImage(brand.id)}
                    alt={brand.name}
                    width={128}
                    height={128}
                    className={`object-contain w-full h-full p-3 md:p-4 transition-opacity ${
                      isSelected ? "opacity-90" : ""
                    }`}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    unoptimized
                  />
                </motion.div>
                <span
                  className={`font-bold text-lg md:text-xl ${
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

