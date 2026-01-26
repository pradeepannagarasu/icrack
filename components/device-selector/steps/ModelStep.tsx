"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { Brand, Model } from "@/types";
import { getModelImage } from "@/lib/deviceImages";
import { DeviceCategory, isModelInCategory } from "@/lib/categoryFilters";

interface ModelStepProps {
  brand: Brand;
  onSelect: (model: Model) => void;
  selectedModel: Model | null;
  category?: DeviceCategory | "phones" | "ipads" | "laptops";
}

export default function ModelStep({
  brand,
  onSelect,
  selectedModel,
  category,
}: ModelStepProps) {
  // Filter models by category if provided (for Apple devices)
  const models = category 
    ? brand.models.filter((model) => {
        if (category === "ipads") {
          return model.id.includes("ipad");
        } else if (category === "phones") {
          return model.id.includes("iphone");
        } else if (category === "laptops") {
          return model.id.includes("macbook") || model.id.includes("mac");
        }
        return isModelInCategory(model.id, category as DeviceCategory);
      })
    : brand.models;

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3">
          Select Your Device
        </h2>
        <p className="text-lg md:text-xl text-neutral-600">
          Choose your {brand.name} model
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {models.map((model, index) => {
          const isSelected = selectedModel?.id === model.id;
          return (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(model)}
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
                    src={getModelImage(brand.id, model.id)}
                    alt={model.name}
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
                  className={`font-semibold text-sm md:text-base text-center ${
                    isSelected ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {model.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

