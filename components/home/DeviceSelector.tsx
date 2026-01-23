"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBrandImage, getModelImage } from "@/lib/deviceImages";
import { DeviceCategory, getBrandsByCategory, getModelsByCategory, isModelInCategory } from "@/lib/categoryFilters";
import { Brand } from "@/types";
import brandsData from "@/data/brands.json";

interface DeviceSelectorProps {
  category?: DeviceCategory;
}

export default function DeviceSelector({ category }: DeviceSelectorProps = {} as DeviceSelectorProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  
  // Get filtered brands based on category
  const brands: Brand[] = category ? getBrandsByCategory(category) : brandsData.brands as Brand[];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
      >
        <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6 text-center">
          What device needs repair?
        </h3>

        <AnimatePresence mode="wait">
          {!selectedBrand ? (
            <motion.div
              key="brands"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {brands.map((brand, index) => (
                  <motion.button
                    key={brand.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -6 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBrand(brand.id)}
                    className="p-6 bg-white hover:bg-primary-50 rounded-2xl border-2 border-neutral-200 hover:border-primary-200 transition-all group shadow-sm hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <motion.div
                        className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={getBrandImage(brand.id, category)}
                          alt={brand.name}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full p-2"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                          unoptimized
                        />
                      </motion.div>
                      <span className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-sm">
                        {brand.name}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  <span>Or start full booking flow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="models"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedBrand(null)}
                className="mb-6 flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="font-medium">Back to brands</span>
              </button>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(category 
                  ? getModelsByCategory(selectedBrand || "", category)
                  : brands.find((b) => b.id === selectedBrand)?.models || []
                ).map((model, index) => (
                    <Link
                      key={model.id}
                      href={(() => {
                        // Determine category based on brand or model
                        let category = "iphone";
                        if (selectedBrand === "apple") {
                          if (model.id.includes("ipad")) {
                            category = "tablets";
                          } else if (model.id.includes("iphone")) {
                            category = "iphone";
                          } else if (model.id.includes("macbook") || model.id.includes("mac")) {
                            category = "laptops";
                          }
                        } else if (selectedBrand === "samsung") {
                          if (model.id.includes("tab")) {
                            category = "tablets";
                          } else {
                            category = "phones";
                          }
                        } else {
                          category = "phones";
                        }
                        return `/repairs/${category}/${model.id}`;
                      })()}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -6 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-6 bg-white hover:bg-primary-50 rounded-2xl border-2 border-neutral-200 hover:border-primary-200 transition-all group shadow-sm hover:shadow-lg"
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <motion.div
                            className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={getModelImage(selectedBrand, model.id)}
                              alt={model.name}
                              width={80}
                              height={80}
                              className="object-contain w-full h-full p-2"
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                              unoptimized
                            />
                          </motion.div>
                          <span className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-center text-sm">
                            {model.name}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

