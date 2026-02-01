"use client";

import { motion } from "framer-motion";
import brandsData from "@/data/brands.json";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";
import DeviceSelectionGrid from "@/components/ui/DeviceSelectionGrid";

const googleModels = brandsData.brands
  .find((b) => b.id === "google")
  ?.models || [];

export default function GoogleRepairsPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Back Link */}
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-600 mb-4 sm:mb-6">
              Google Pixel Repairs
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 max-w-3xl mx-auto px-2">
              Expert Google Pixel phone repairs with 12-month warranty. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selector - same layout: 4 columns, light blue shape, pink text */}
      <DeviceSelectionGrid
        title="Select Your Google Pixel Device"
        subtitle="Choose your Google Pixel model to see available repair options and pricing"
        models={googleModels}
        baseHref="/repairs/phones"
        getImageSrc={(id) => getModelImage("google", id)}
        fallbackImage="/images/mobile.png"
        columns={4}
        showScrollToTop
      />
    </div>
  );
}

