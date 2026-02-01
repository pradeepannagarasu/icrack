"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brand, Model } from "@/types";
import { getModelImage } from "@/lib/deviceImages";
import { DeviceCategory, isModelInCategory } from "@/lib/categoryFilters";
import {
  filteriPadModelsBySubcategory,
  filterMacBookModelsBySubcategory,
} from "@/components/booking/steps/AppleSubcategoryStep";

interface ModelStepProps {
  brand: Brand;
  onSelect: (model: Model) => void;
  selectedModel: Model | null;
  category?: DeviceCategory | "phones" | "laptops";
  /** When category is tablets or laptops, filter by this subcategory (e.g. ipad-pro, macbook-air) */
  subcategory?: string;
}

export default function ModelStep({
  brand,
  onSelect,
  selectedModel,
  category,
  subcategory,
}: ModelStepProps) {
  if (!brand?.id || !brand?.models) return null;
  const allModels = (brand.models || []).filter((m) => m && m.id);
  let models = category
    ? allModels.filter((model) => {
        if (category === "phones") return model.id.includes("iphone");
        if (category === "laptops") return model.id.includes("macbook") || model.id.includes("mac");
        return isModelInCategory(model.id, category as DeviceCategory);
      })
    : allModels;
  if (subcategory && (category === "tablets" || category === "laptops")) {
    models = models.filter((model) =>
      category === "tablets"
        ? filteriPadModelsBySubcategory(model.id, subcategory)
        : filterMacBookModelsBySubcategory(model.id, subcategory)
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-600 mb-3">
          Select Your Device
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Choose your {brand.name} model
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {models.map((model, index) => {
          const isSelected = selectedModel?.id === model.id;
          return (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(model)}
              className={`relative p-6 lg:p-8 rounded-2xl border transition-all text-center flex flex-col items-center group ${
                isSelected
                  ? "bg-primary-600 border-primary-600 shadow-lg"
                  : "bg-white border-neutral-200 hover:border-primary-300 hover:shadow-xl"
              }`}
            >
              {/* Light blue geometric shape (only when not selected) */}
              {!isSelected && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rotate-45 rounded-xl opacity-60"
                    style={{ backgroundColor: "#bae6fd" }}
                  />
                </div>
              )}

              <div className="relative z-10 h-36 w-full flex items-center justify-center mb-4 flex-shrink-0">
                <Image
                  src={getModelImage(brand.id, model.id)}
                  alt={model.name}
                  width={140}
                  height={140}
                  className={`object-contain w-full h-full p-4 transition-transform ${
                    isSelected ? "opacity-90" : "group-hover:scale-105"
                  }`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/mobile.png";
                  }}
                />
              </div>
              <span
                className={`font-semibold text-base lg:text-lg text-center ${
                  isSelected ? "text-white" : "text-primary-600"
                }`}
              >
                {model.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

