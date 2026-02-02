"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Percent, CheckCircle2, Mail } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const benefits = [
  {
    title: "10% Off All Repairs",
    description: "Get 10% discount on all repair services including screen, battery, and camera repairs.",
  },
  {
    title: "Valid Student ID Required",
    description: "Simply show your valid student ID when booking or visiting our store.",
  },
  {
    title: "No Expiry Date",
    description: "This discount is available year-round for all students with valid ID.",
  },
  {
    title: "All Services Included",
    description: "Discount applies to repairs and refurbished devices.",
  },
];

export default function StudentDiscountPage() {
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
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Student Discount
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <Percent className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
              <span className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary-600">10%</span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">OFF</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Exclusive discount for students on all our repair services and products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <div className="bg-primary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-700">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              How to Claim Your Discount
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Book Your Repair",
                description: "Book online or visit our store with your valid student ID.",
              },
              {
                step: "2",
                title: "Show Your Student ID",
                description: "Present your valid student ID card when booking or at the store.",
              },
              {
                step: "3",
                title: "Get Your Discount",
                description: "We'll apply your 10% discount automatically to your repair or purchase.",
              },
            ].map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <div className="flex items-start space-x-4 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
              Ready to Use Your Student Discount?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 px-2">
              Book your repair today and save 10% with your student ID.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/select-device"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
              >
                <span>Book Repair</span>
              </Link>
              <a
                href="mailto:Phonesnmacs40@gmail.com?subject=Student Discount Inquiry"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-all"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

