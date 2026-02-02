"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag, Percent, Gift } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const currentOffers = [
  {
    icon: Tag,
    title: "Screen Repair Special",
    description: "Get 20% off all screen repairs this month",
    discount: "20% OFF",
    validUntil: "End of month",
    cta: "Book Now",
    href: "/repairs/screen",
  },
  {
    icon: Gift,
    title: "Battery Replacement Deal",
    description: "Battery replacements from just £35",
    discount: "From £35",
    validUntil: "Ongoing",
    cta: "View Deal",
    href: "/repairs/battery",
  },
  {
    icon: Percent,
    title: "Student Discount",
    description: "10% off all repairs for students",
    discount: "10% OFF",
    validUntil: "Always available",
    cta: "Learn More",
    href: "/student-discount",
  },
];

export default function OffersPage() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              iCrack Offers & Deals
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Save on repairs with our latest offers and promotions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Current Offers
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {currentOffers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <ScrollReveal key={offer.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-primary-200 relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                      {offer.discount}
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                      {offer.description}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 mb-4 sm:mb-6">
                      Valid until: {offer.validUntil}
                    </p>
                    <Link
                      href={offer.href}
                      className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-700 transition-all hover:shadow-lg"
                    >
                      <span>{offer.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Never Miss a Deal
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 px-2">
              Sign up for our newsletter to receive exclusive offers and promotions directly to your inbox.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-primary-700 transition-all hover:shadow-xl"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

