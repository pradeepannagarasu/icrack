"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

export default function TermsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-sm sm:text-base text-neutral-600">
              Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                Welcome to iCrack. These Terms and Conditions govern your use of our website and services. By using our services, you agree to be bound by these terms.
              </p>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                2. Services
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                iCrack provides mobile phone, tablet, and laptop repair services, as well as refurbished devices. All services are subject to availability and our terms.
              </p>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                3. Pricing and Payment
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>All prices are in GBP and include VAT where applicable</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is required before or at the time of service</li>
                <li>We accept cash, card, and Klarna payment options</li>
                <li>Refunds are processed according to our refund policy</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                4. Warranty
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                Most repairs come with a 12-month warranty covering parts and workmanship. iPhone battery replacements include a 24-month warranty. Warranty terms are detailed in our warranty policy.
              </p>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                5. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                iCrack is not liable for any data loss that may occur during repairs. We recommend backing up your device before any service. Our liability is limited to the cost of the repair service provided.
              </p>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                6. Contact Information
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                For questions about these terms, please contact us at:
              </p>
              <ul className="list-none space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>Email: Phonesnmacs40@gmail.com</li>
                <li>Phone: 02081275250</li>
                <li>Address: 40a Notting Hill Gate, London W11 3HX</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

