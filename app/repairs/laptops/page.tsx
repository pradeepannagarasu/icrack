"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import brandsData from "@/data/brands.json";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";

interface ModelItem {
  id: string;
  name: string;
}

const rawLaptopModels = (brandsData.brands
  .find((b) => b.id === "apple")
  ?.models.filter((m) => m.id.includes("macbook")) || []) as ModelItem[];

/** Dedupe by id – brands.json has multiple entries per id; keep one per id with short name */
function getUniqueMacBookModels(models: ModelItem[]): ModelItem[] {
  const byId = new Map<string, string>();
  const displayNames: Record<string, string> = {
    "macbook-pro-16": "MacBook Pro 16\"",
    "macbook-pro-15": "MacBook Pro 15\"",
    "macbook-pro-14": "MacBook Pro 14\"",
    "macbook-pro-13": "MacBook Pro 13\"",
    "macbook-air-15": "MacBook Air 15\"",
    "macbook-air-13": "MacBook Air 13\"",
    "macbook-air-11": "MacBook Air 11\"",
    "macbook-12": "MacBook 12\"",
  };
  models.forEach((m) => {
    if (!byId.has(m.id)) {
      byId.set(m.id, displayNames[m.id] || m.name);
    }
  });
  return Array.from(byId.entries()).map(([id, name]) => ({ id, name }));
}

const allLaptopModels = getUniqueMacBookModels(rawLaptopModels);

type MacBookCategory = "macbook-pro" | "macbook-air" | "macbook";

const categories: { id: MacBookCategory; name: string }[] = [
  { id: "macbook-pro", name: "MacBook Pro" },
  { id: "macbook-air", name: "MacBook Air" },
  { id: "macbook", name: "MacBook" },
];

function filterModelsByCategory(models: ModelItem[], category: MacBookCategory): ModelItem[] {
  return models.filter((model) => {
    const id = model.id.toLowerCase();
    if (category === "macbook-pro") return id.includes("macbook-pro");
    if (category === "macbook-air") return id.includes("macbook-air");
    if (category === "macbook") {
      return id.includes("macbook") && !id.includes("macbook-pro") && !id.includes("macbook-air");
    }
    return false;
  });
}

/** Sort MacBook models: Pro 16, 15, 14, 13; Air 15, 13, 11; MacBook 12 */
function sortMacBookModels<T extends { id: string }>(models: T[]): T[] {
  const order = [
    "macbook-pro-16",
    "macbook-pro-15",
    "macbook-pro-14",
    "macbook-pro-13",
    "macbook-air-15",
    "macbook-air-13",
    "macbook-air-11",
    "macbook-12",
  ];
  return [...models].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.id.localeCompare(b.id);
  });
}

export default function LaptopsPage() {
  const [expandedCategory, setExpandedCategory] = useState<MacBookCategory | null>(null);

  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Back Link */}
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-600 mb-6">
              MacBook Repairs
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
              Expert MacBook battery repairs with 12-month warranty. Select your MacBook type, then choose your model below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 1: Choose category – MacBook Pro, MacBook Air, MacBook */}
      <section className="bg-neutral-50 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-600 mb-6 text-center">
            Select your MacBook type
          </h2>
          <p className="text-neutral-600 text-center mb-8 max-w-2xl mx-auto">
            Choose MacBook Pro, MacBook Air or MacBook – then pick your model below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => {
              const isSelected = expandedCategory === cat.id;
              const modelCount = filterModelsByCategory(allLaptopModels, cat.id).length;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setExpandedCategory(isSelected ? null : cat.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-2xl border-2 p-6 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-left ${
                    isSelected
                      ? "border-primary-600 bg-primary-50 shadow-lg ring-2 ring-primary-200"
                      : "border-neutral-200 bg-white hover:border-primary-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-neutral-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/mackbook.jpg"
                        alt=""
                        className="object-contain w-full h-full p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-lg text-primary-600 block">
                        {cat.name}
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-500 block mt-0.5">
                        {modelCount} model{modelCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary-600 shrink-0 self-center sm:self-auto">
                    {isSelected ? "Hide models" : "Select Device"}
                    {isSelected ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Step 2: Models for selected category – full width */}
          <AnimatePresence mode="wait">
            {expandedCategory && (() => {
              const selectedCat = categories.find((c) => c.id === expandedCategory);
              const models = sortMacBookModels(filterModelsByCategory(allLaptopModels, expandedCategory));
              if (!selectedCat || models.length === 0) return null;
              return (
                <motion.div
                  key={expandedCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 lg:mt-14 pt-8 lg:pt-10 border-t border-neutral-200"
                >
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary-600 mb-2">
                    {selectedCat.name} – Select your model
                  </h3>
                  <p className="text-neutral-600 mb-6 sm:mb-8">
                    {models.length} model{models.length !== 1 ? "s" : ""} available. Tap one to see repair options.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {models.map((model, index) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.25 }}
                      >
                        <Link href={`/repairs/laptops/${model.id}`} className="block h-full">
                          <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative bg-white rounded-2xl p-5 sm:p-6 border-2 border-neutral-200 hover:border-primary-400 hover:shadow-xl transition-all text-center group h-full flex flex-col items-center"
                          >
                            <div className="min-h-[120px] h-28 sm:h-32 lg:h-36 w-full flex items-center justify-center mb-3 flex-shrink-0">
                              <img
                                src={getModelImage("apple", model.id)}
                                alt={model.name}
                                className="object-contain w-full h-full max-h-[120px] sm:max-h-[140px] lg:max-h-[160px] p-2 sm:p-3"
                                onError={(e) => {
                                  const t = e.target as HTMLImageElement;
                                  t.src = "/images/mackbook.jpg";
                                }}
                              />
                            </div>
                            <h4 className="font-semibold text-primary-600 text-sm sm:text-base group-hover:text-primary-700 line-clamp-2">
                              {model.name}
                            </h4>
                            <span className="mt-1 text-xs text-neutral-500 group-hover:text-primary-600">
                              View repairs →
                            </span>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
