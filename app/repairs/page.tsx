"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Battery,
  Camera,
  Plug,
  Droplets,
  Stethoscope,
  Volume2,
  Code,
  ArrowRight,
} from "lucide-react";
import RepairCategoryCard from "@/components/repairs/RepairCategoryCard";
import DeviceSelectorCTA from "@/components/repairs/DeviceSelectorCTA";
import TrustIndicators from "@/components/repairs/TrustIndicators";
import RepairsFAQ from "@/components/repairs/RepairsFAQ";
import WhyICrack from "@/components/home/WhyICrack";
import CallOutServiceBanner from "@/components/repairs/CallOutServiceBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const repairCategories = [
  {
    icon: Smartphone,
    title: "Screen Repair",
    description: "Fast screen replacement for cracked, broken, or unresponsive displays. Professional service with quality parts.",
    href: "/repairs/screen",
    ctaText: "View Repair",
    duration: "60-120 mins",
    warranty: "12 months",
    repairTypeId: "screen",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Extend your device life with a new battery. Quick replacement service with improved performance.",
    href: "/repairs/battery",
    ctaText: "View Repair",
    duration: "60 mins",
    warranty: "12 months",
    repairTypeId: "battery",
  },
  {
    icon: Camera,
    title: "Camera Repair",
    description: "Fix blurry photos, black screens, or cracked lenses. Front and rear camera repairs available.",
    href: "/repairs/camera",
    ctaText: "View Repair",
    duration: "60 mins",
    warranty: "12 months",
    repairTypeId: "camera",
  },
  {
    icon: Plug,
    title: "Charging Port",
    description: "Restore charging functionality. Fix loose connections, damaged ports, and charging issues.",
    href: "/repairs/charging-port",
    ctaText: "View Repair",
    duration: "60 mins",
    warranty: "12 months",
    repairTypeId: "charging-port",
  },
  {
    icon: Droplets,
    title: "Water Damage",
    description: "Expert water damage restoration. Professional cleaning and component replacement service.",
    href: "/repairs/water-damage",
    ctaText: "View Repair",
    duration: "120-240 mins",
    warranty: "6 months",
    repairTypeId: "water-damage",
  },
  {
    icon: Stethoscope,
    title: "Diagnostics",
    description: "Comprehensive device diagnostics. Identify issues and get repair recommendations.",
    href: "/repairs/diagnostics",
    ctaText: "View Repair",
    duration: "30 mins",
    warranty: "N/A",
    repairTypeId: "diagnostics",
  },
  {
    icon: Volume2,
    title: "Speaker Repair",
    description: "Fix audio issues, distorted sound, or no sound. Speaker and earpiece repairs available.",
    href: "/repairs/speaker",
    ctaText: "View Repair",
    duration: "60 mins",
    warranty: "12 months",
    repairTypeId: "speaker",
  },
  {
    icon: Code,
    title: "Software Issues",
    description: "Resolve software problems, updates, and system errors. Expert troubleshooting service.",
    href: "/repairs/software",
    ctaText: "View Repair",
    duration: "60-120 mins",
    warranty: "3 months",
    repairTypeId: "software",
  },
];

export default function RepairsPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Express Mobile Phone Repairs
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto px-2">
              iCrack is your one stop shop for all your mobile phone needs. We provide expert advice, fast turnaround times, competitive pricing and quality workmanship. With our team of highly skilled professionals, we can help you with any smart phone repairs.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-600 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto px-2">
              We offer a wide range of services including glass screen and LCD replacement, including touch screens. Water damage diagnosis, headphone jack and home button repairs, battery upgrades, camera repairs, rear housing and body work repairs, audio issues, Wi-Fi/signal connectivity problems and many more!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selector CTA */}
      <section className="py-8 sm:py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Select Your Mobile
            </h2>
          </ScrollReveal>
          <DeviceSelectorCTA />
        </div>
      </section>

      {/* Call-out Service Banner */}
      <CallOutServiceBanner />

      {/* Repair Categories Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
              Our Repair Services
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto px-2">
              Choose a repair service below to learn more or book an appointment
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {repairCategories.map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 0.05}>
                <RepairCategoryCard {...category} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Reasons Section */}
      <WhyICrack />

      {/* FAQs Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              FAQs About the Mobile Phone Repairs
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
              Here are some of the most common questions we get asked around Mobile Phone Repairs - select your issue and see what we can do for you.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 mt-2 px-2">
              Here are some of the most common questions we get asked around smart phone Repairs - select your issue and see how we can get your phone working again.
            </p>
          </ScrollReveal>
          <RepairsFAQ />
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
              Ready to Get Your Phone Fixed?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Book your repair today and get your device fixed by our expert technicians. Fast service, quality parts, and peace of mind.
            </p>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/book"
                    className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
                  >
                    <span>Book Repair Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    <span>Contact Us</span>
                  </Link>
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-white/90">
                <span className="text-sm font-medium">12-Month Warranty</span>
                <span className="text-white/50">•</span>
                <span className="text-sm font-medium">No Fix, No Fee</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

