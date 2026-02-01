"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brand, Model } from "@/types";
import { getModelImage } from "@/lib/deviceImages";
import { DeviceCategory, isModelInCategory } from "@/lib/categoryFilters";
import {
  filteriPadModelsBySubcategory,
  filterMacBookModelsBySubcategory,
} from "./AppleSubcategoryStep";

interface DeviceStepProps {
  brand: Brand;
  onSelect: (model: Model) => void;
  category?: DeviceCategory;
  /** When category is tablets or laptops, filter by this subcategory (e.g. ipad-pro, macbook-air) */
  subcategory?: string;
}

export default function DeviceStep({ brand, onSelect, category, subcategory }: DeviceStepProps) {
  let models = category
    ? brand.models.filter((model) => isModelInCategory(model.id, category))
    : brand.models;
  if (subcategory && (category === "tablets" || category === "laptops")) {
    models = models.filter((model) =>
      category === "tablets"
        ? filteriPadModelsBySubcategory(model.id, subcategory)
        : filterMacBookModelsBySubcategory(model.id, subcategory)
    );
  }
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-3">
          Choose Your Device
        </h2>
        <p className="text-lg text-neutral-600">
          Select your {brand.name} model
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {models.map((model, index) => (
          <motion.button
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(model)}
            className="relative p-6 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
          >
            {/* Diamond-shaped background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-100/30 rotate-45 rounded-lg"></div>
            </div>
            
            <div className="flex flex-col items-center space-y-3 relative z-10">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={getModelImage(brand.id, model.id)}
                  alt={model.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/mobile.png";
                  }}
                />
              </div>
              <span className="font-semibold text-primary-600 group-hover:text-primary-700 transition-colors text-center text-sm">
                {model.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

