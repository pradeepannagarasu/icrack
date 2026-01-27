"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import brandsData from "@/data/brands.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Google Pixel Repairs
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 max-w-3xl mx-auto px-2">
              Expert Google Pixel phone repairs with 12-month warranty. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selector */}
      <section className="py-8 sm:py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary-600 mb-3 sm:mb-4">
              Select Your Google Pixel Device
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
              Choose your Google Pixel model to see available repair options and pricing
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {googleModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link href={`/repairs/phones/${model.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all text-center group"
                  >
                    {/* Diamond-shaped background */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-100/30 rotate-45 rounded-lg"></div>
                    </div>
                    
                    {/* Device image */}
                    <div className="relative z-10 w-full h-32 sm:h-40 bg-white rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                      <Image
                        src={getModelImage("google", model.id)}
                        alt={model.name}
                        width={150}
                        height={150}
                        className="object-contain w-full h-full p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/mobile.png";
                        }}
                      />
                    </div>
                    
                    {/* Device name in pink */}
                    <h3 className="relative z-10 text-sm sm:text-base font-display font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                      {model.name}
                    </h3>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

