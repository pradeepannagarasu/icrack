"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { categoryImages } from "@/lib/deviceImages";

export type iPadSubcategory = "ipad" | "ipad-pro" | "ipad-mini" | "ipad-air";
export type MacBookSubcategory = "macbook-pro" | "macbook-air" | "macbook";

const iPad_CATEGORIES: { id: iPadSubcategory; name: string }[] = [
  { id: "ipad", name: "iPad" },
  { id: "ipad-pro", name: "iPad Pro" },
  { id: "ipad-mini", name: "iPad Mini" },
  { id: "ipad-air", name: "iPad Air" },
];

const MACBOOK_CATEGORIES: { id: MacBookSubcategory; name: string }[] = [
  { id: "macbook-pro", name: "MacBook Pro" },
  { id: "macbook-air", name: "MacBook Air" },
  { id: "macbook", name: "MacBook" },
];

interface AppleSubcategoryStepProps {
  type: "tablets" | "laptops";
  onSelect: (subcategoryId: string) => void;
}

export default function AppleSubcategoryStep({ type, onSelect }: AppleSubcategoryStepProps) {
  const categories = type === "tablets" ? iPad_CATEGORIES : MACBOOK_CATEGORIES;
  const title = type === "tablets" ? "Choose your iPad type" : "Choose your MacBook type";
  const subtitle = type === "tablets"
    ? "Select iPad, iPad Pro, iPad Mini or iPad Air"
    : "Select MacBook Pro, MacBook Air or MacBook";
  const image = type === "tablets" ? categoryImages.tablets : categoryImages.laptops;

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-3">
          {title}
        </h2>
        <p className="text-lg text-neutral-600">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(cat.id)}
            className="p-6 md:p-8 bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all group flex flex-col items-center"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-sm mb-4">
              <Image
                src={image}
                alt={cat.name}
                width={112}
                height={112}
                className="object-contain w-full h-full p-3 group-hover:scale-110 transition-transform duration-300"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                unoptimized
              />
            </div>
            <span className="font-bold text-lg text-primary-600 group-hover:text-primary-700 transition-colors text-center">
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/** Filter iPad models by subcategory (same logic as tablets page) */
export function filteriPadModelsBySubcategory(modelId: string, subcategory: string): boolean {
  const id = modelId.toLowerCase();
  if (subcategory === "ipad-pro") return id.includes("ipad-pro");
  if (subcategory === "ipad-air") return id.includes("ipad-air");
  if (subcategory === "ipad-mini") return id.includes("ipad-mini");
  if (subcategory === "ipad") {
    return id.includes("ipad") && !id.includes("ipad-pro") && !id.includes("ipad-air") && !id.includes("ipad-mini");
  }
  return false;
}

/** Filter MacBook models by subcategory (same logic as laptops page) */
export function filterMacBookModelsBySubcategory(modelId: string, subcategory: string): boolean {
  const id = modelId.toLowerCase();
  if (subcategory === "macbook-pro") return id.includes("macbook-pro");
  if (subcategory === "macbook-air") return id.includes("macbook-air");
  if (subcategory === "macbook") {
    return id.includes("macbook") && !id.includes("macbook-pro") && !id.includes("macbook-air");
  }
  return false;
}
