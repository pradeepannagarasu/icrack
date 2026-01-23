"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CreditCard, CheckCircle2, Shield, Clock } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";
import Link from "next/link";

const benefits = [
  {
    icon: CreditCard,
    title: "3 Interest-Free Payments",
    description: "Split your payment into 3 equal instalments with 0% interest. No hidden fees.",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Klarna is a trusted payment provider used by millions of customers worldwide.",
  },
  {
    icon: Clock,
    title: "Instant Approval",
    description: "Get approved instantly at checkout. No lengthy application process required.",
  },
  {
    icon: CheckCircle2,
    title: "Flexible Options",
    description: "Available for repairs and purchases over £35. Pay over time, stress-free.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Add to Cart",
    description: "Add your repair or product to your cart and proceed to checkout.",
  },
  {
    step: "2",
    title: "Choose Klarna",
    description: "Select Klarna as your payment method at checkout.",
  },
  {
    step: "3",
    title: "Get Approved",
    description: "Complete a quick approval process - usually instant.",
  },
  {
    step: "4",
    title: "Pay in 3",
    description: "Pay the first instalment now, and the remaining two over the next 2 months.",
  },
];

export default function SplitPaymentPage() {
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
            <div className="flex justify-center mb-6">
              <div className="relative w-48 sm:w-64 h-12 sm:h-16">
                <Image
                  src="/images/klarna.jpg"
                  alt="Klarna"
                  fill
                  className="object-contain"
                  sizes="256px"
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Split Your Payment in 3
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Pay for your repairs and purchases in 3 interest-free instalments with Klarna.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
              No interest, no fees. Just simple, flexible payments that work for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Why Choose Klarna?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={benefit.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-6 text-center h-full"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700">{benefit.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {howItWorks.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-4 sm:mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-700">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-primary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                Important Information
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-neutral-700">
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Available for purchases and repairs over £35</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Subject to status and approval by Klarna</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>18+ only. Terms and conditions apply</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Pay in 3 instalments with 0% interest</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>First payment taken at checkout, remaining payments automatically collected</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
              Ready to Shop with Klarna?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 px-2">
              Add items to your cart and choose Klarna at checkout to split your payment.
            </p>
            <Link
              href="/repairs"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
            >
              <span>Browse Repairs</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

