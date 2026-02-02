"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import brandsData from "@/data/brands.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";
import DeviceSelectionGrid from "@/components/ui/DeviceSelectionGrid";

const iphoneModels = brandsData.brands
  .find((b) => b.id === "apple")
  ?.models.filter((m) => m.id.includes("iphone")) || [];

export default function iPhoneRepairsPage() {
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
              iPhone Repairs
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
              Expert iPhone repairs with 12-month warranty on all screen replacements and 24-month warranty on battery replacements. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selector - same layout as image: 4 columns, light blue shape, pink text */}
      <DeviceSelectionGrid
        title="Select Your iPhone"
        subtitle="Choose your iPhone model to see available repair options"
        models={iphoneModels}
        baseHref="/repairs/iphone"
        getImageSrc={(id) => getModelImage("apple", id)}
        fallbackImage="/images/mobile.png"
        columns={4}
        showScrollToTop
      />

      {/* Why Choose Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Choose us?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "UK's leading high-street technology repair service.",
              "Highly qualified technicians.",
              "Use the highest quality parts that are quality controlled.",
              "All our iPhone screen replacements come with a 12-month warranty, and battery replacements include a 24-month warranty.",
              "Highly rated on Trustpilot by our customers.",
              "iPhone express repair service: We ensure your iPhone is fixed and back to working order in no time. Most repairs take between 30 minutes and 1 hour.",
            ].map((point, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <p className="text-neutral-700 text-sm leading-relaxed">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Repair Your iPhone?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Select your iPhone model above or book an appointment directly
            </p>
            <Link
              href="/select-device"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
