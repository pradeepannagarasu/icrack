"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Recycle, TreePine, Heart } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const initiatives = [
  {
    icon: Recycle,
    title: "Device Recycling",
    description: "We recycle old and broken devices responsibly, ensuring components are properly disposed of or reused.",
  },
  {
    icon: TreePine,
    title: "Repair Over Replace",
    description: "By repairing devices instead of replacing them, we help reduce electronic waste and extend device lifespans.",
  },
  {
    icon: Heart,
    title: "Sustainable Practices",
    description: "We use eco-friendly packaging and work with suppliers who share our commitment to sustainability.",
  },
  {
    icon: Leaf,
    title: "Carbon Neutral Shipping",
    description: "Our mail-in service uses carbon-neutral shipping options to minimize environmental impact.",
  },
];

export default function EnvironmentPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 sm:py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/" label="Go back" />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto mt-8"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Our Environmental Commitment
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              At iCrack, we're committed to reducing electronic waste and promoting sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Our Environmental Initiatives
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <ScrollReveal key={initiative.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-green-50 to-primary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700">{initiative.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Our Impact
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: "500K+", label: "Devices Repaired" },
              { number: "100K+", label: "Devices Recycled" },
              { number: "50%", label: "Waste Reduction" },
              { number: "100%", label: "Carbon Neutral Shipping" },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-600 mb-2 sm:mb-3">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-neutral-700">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-green-600 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 px-2">
              Choose repair over replacement and help reduce electronic waste. Every repair makes a difference.
            </p>
            <Link
              href="/repairs"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
            >
              <span>Book a Repair</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

