"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function TrustLogos() {
  return (
    <section className="py-6 sm:py-8 lg:py-16 bg-gradient-to-b from-white to-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-6 sm:mb-8 lg:mb-10">
          <p className="text-xs sm:text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1 sm:mb-2">
            Trusted & Secure
          </p>
          <p className="text-neutral-600 text-xs sm:text-sm">
            Shop with confidence using our trusted payment partners
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-16">
          {/* Trustpilot Logo */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-neutral-200 hover:shadow-lg transition-all w-full md:w-auto"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative w-32 sm:w-40 h-8 sm:h-10 flex-shrink-0">
                  <Image
                    src="/images/trustpilot.jpg"
                    alt="Trustpilot"
                    fill
                    className="object-contain"
                    sizes="160px"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-700">4.8+ Rating</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Based on verified customer reviews</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Divider */}
          <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-neutral-300 to-transparent" />

          {/* Klarna Logo */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-neutral-200 hover:shadow-lg transition-all w-full md:w-auto"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative w-32 sm:w-40 h-8 sm:h-10 flex-shrink-0">
                  <Image
                    src="/images/klarna.jpg"
                    alt="Klarna"
                    fill
                    className="object-contain"
                    sizes="160px"
                    priority
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800">
                    Buy now, pay later with Klarna
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Subject to status. T&amp;Cs apply.</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

