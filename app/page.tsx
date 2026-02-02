"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Clock, Award, CheckCircle2, Star } from "lucide-react";
import DeviceSelector from "@/components/home/DeviceSelector";
import ServiceCard from "@/components/home/ServiceCard";
import TrustBadge from "@/components/home/TrustBadge";
import DeviceCategories from "@/components/home/DeviceCategories";
import RepairReplaceProtect from "@/components/home/RepairReplaceProtect";
import WhyICrack from "@/components/home/WhyICrack";
import TrustLogos from "@/components/home/TrustLogos";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { heroVariants, fadeInUp } from "@/lib/animations";
import { refurbishedIphones } from "@/lib/refurbished";

const services = [
  {
    icon: Shield,
    title: "Screen Repair",
    description: "Fast and professional screen replacements for all major phone brands.",
    href: "/repairs/screen",
  },
  {
    icon: Clock,
    title: "Battery Replacement",
    description: "Extend your phone's life with our premium battery replacement service.",
    href: "/repairs/battery",
  },
  {
    icon: Award,
    title: "Water Damage",
    description: "Expert water damage repair and restoration services.",
    href: "/repairs/water-damage",
  },
];

const trustBadges = [
  { icon: CheckCircle2, text: "12-Month Warranty" },
  { icon: Star, text: "4.9/5 Customer Rating" },
  { icon: Shield, text: "Certified Technicians" },
  { icon: Clock, text: "Same-Day Service" },
];

export default function Home() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero section.jpg"
            alt="Hero section"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            unoptimized
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/70 to-neutral-900/80" />
          {/* Accent overlay for brand color */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-accent-900/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              Professional Phone
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block text-primary-500 mt-1 sm:mt-2 font-extrabold tracking-tight"
              >
                Repairs Made Simple
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Fast, reliable, and affordable repairs for all major phone brands. 
              Get your device fixed by certified technicians with a 12-month warranty.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/select-device"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-primary-700 transition-all hover:shadow-2xl flex items-center space-x-2 group shadow-lg"
                >
                  <span>Book Your Repair</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/repairs"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/95 text-neutral-900 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white transition-all hover:shadow-xl backdrop-blur-sm"
                >
                  View All Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-primary-300" />
                <span className="font-medium">12-Month Warranty</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full" />
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary-300" />
                <span className="font-medium">Same-Day Service</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full" />
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-primary-300 fill-primary-300" />
                <span className="font-medium">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Gradient Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Trust Logos Section */}
      <TrustLogos />

      {/* Device Categories Section */}
      <DeviceCategories />

      {/* Repair, Replace, Protect Section */}
      <RepairReplaceProtect />

      {/* Device Selector Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Select Your Device
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-2">
              Choose your brand and model to see available repair options and pricing
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <DeviceSelector />
          </ScrollReveal>
        </div>
      </section>

      {/* Why iCrack Section */}
      <WhyICrack />

      {/* Services Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-2">
              Comprehensive repair solutions for all your mobile device needs
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <ServiceCard {...service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Refurbished Phones Section - same data as /refurbished */}
      <section id="refurbished-iphones" className="py-8 sm:py-12 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Refurbished iPhones
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-2">
              Premium, fully-tested Apple iPhones with 24-month warranty and multiple colour & storage options.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {(refurbishedIphones || []).slice(0, 6).map((phone, index) => (
              <ScrollReveal key={phone.id} delay={index * 0.05}>
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-neutral-200 p-4 sm:p-6 flex flex-col">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-50 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/mobile.png"
                        alt={phone.name}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full p-2 sm:p-3"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-900 mb-1">
                        {phone.name}
                      </h3>
                      <p className="text-sm text-primary-600 font-semibold mb-1">
                        From £{phone.basePrice}
                      </p>
                      <p className="text-xs text-neutral-500">
                        24-month warranty • {phone.condition} condition
                      </p>
                    </div>
                  </div>

                  {/* Storage options */}
                  <div className="mb-2 sm:mb-3">
                    <p className="text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wide">
                      Storage
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {phone.storageOptions.map((s) => (
                        <span
                          key={s}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-medium border-primary-200 text-primary-700 bg-primary-50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colour options */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wide">
                      Colours
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {phone.colours.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 sm:px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] sm:text-[11px] font-medium text-neutral-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2 gap-2">
                    <Link
                      href={`/refurbished/${phone.id}`}
                      className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/refurbished/${phone.id}?mode=enquire`}
                      className="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-600 text-white text-xs sm:text-sm font-semibold hover:bg-primary-700 transition-all hover:shadow-md"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-8">
            <Link
              href="/refurbished"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              View all refurbished iPhones ({refurbishedIphones?.length ?? 0} models)
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Why Choose iCrack?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, index) => (
              <ScrollReveal key={badge.text} delay={index * 0.1}>
                <TrustBadge {...badge} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Book your repair today and get your device fixed by our expert technicians. 
              Fast service, quality parts, and peace of mind.
            </p>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/select-device"
                  className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
                >
                  <span>Book Your Repair Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
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

