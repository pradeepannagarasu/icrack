"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import brandsData from "@/data/brands.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";
import DeviceSelectionGrid from "@/components/ui/DeviceSelectionGrid";

const allLaptopModels = brandsData.brands
  .find((b) => b.id === "apple")
  ?.models.filter((m) => m.id.includes("macbook")) || [];

type MacBookCategory = "all" | "macbook-pro" | "macbook-air" | "macbook";

const categories: { id: MacBookCategory; name: string }[] = [
  { id: "all", name: "All MacBooks" },
  { id: "macbook-pro", name: "MacBook Pro" },
  { id: "macbook-air", name: "MacBook Air" },
  { id: "macbook", name: "MacBook" },
];

function filterModelsByCategory(models: typeof allLaptopModels, category: MacBookCategory) {
  if (category === "all") return models;
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

export default function LaptopsPage() {
  const [selectedCategory, setSelectedCategory] = useState<MacBookCategory>("all");
  const filteredModels = filterModelsByCategory(allLaptopModels, selectedCategory);

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
              Expert MacBook battery repairs with 12-month warranty. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Device Selector - same layout: 4 columns, light blue shape, pink text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DeviceSelectionGrid
            title={
              selectedCategory === "all"
                ? "Select Your MacBook"
                : `Select Your ${categories.find((c) => c.id === selectedCategory)?.name}`
            }
            subtitle="Choose your MacBook model to see available repair options"
            models={filteredModels}
            baseHref="/repairs/laptops"
            getImageSrc={(id) => getModelImage("apple", id)}
            fallbackImage="/images/mackbook.jpg"
            columns={4}
            showScrollToTop
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
