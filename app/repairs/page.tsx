"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DeviceSelectorCTA from "@/components/repairs/DeviceSelectorCTA";
import TrustIndicators from "@/components/repairs/TrustIndicators";
import RepairsFAQ from "@/components/repairs/RepairsFAQ";
import WhyICrack from "@/components/home/WhyICrack";
import CallOutServiceBanner from "@/components/repairs/CallOutServiceBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

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

