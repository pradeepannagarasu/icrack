"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

export default function PrivacyPage() {
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
              Privacy Policy
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
                1. Information We Collect
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>Name, email address, and phone number</li>
                <li>Device information and repair details</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                2. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                We use your information to:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>Process and fulfill your repair requests</li>
                <li>Communicate with you about your orders and services</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                3. Data Security
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                4. Your Rights
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 mt-8 sm:mt-12">
                5. Contact Us
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                For privacy-related questions, contact us at:
              </p>
              <ul className="list-none space-y-2 text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                <li>Email: Phonesnmacs40@gmail.com</li>
                <li>Phone: 02081275250</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

