"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Clock, Award, AlertCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const warrantyTypes = [
  {
    icon: Shield,
    title: "12-Month Repair Warranty",
    description: "Most repairs come with a comprehensive 12‑month warranty covering parts and workmanship.",
    coverage: ["Parts defects", "Workmanship issues", "Component failures"],
  },
  {
    icon: Award,
    title: "24-Month Battery Warranty",
    description: "Battery replacements are backed by an extended 24‑month warranty for extra peace of mind.",
    coverage: ["Battery defects", "Premature capacity loss", "Performance issues"],
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Warranty claims are processed quickly, with most repairs completed within 24-48 hours.",
    coverage: ["Fast assessment", "Priority service", "Quick resolution"],
  },
];

const warrantyTerms = [
  {
    title: "What's Covered",
    items: [
      "Defects in parts used for your repair",
      "Workmanship issues from the original repair",
      "Component failures related to the repair",
      "Screen damage on screen repairs (12‑month warranty)",
    ],
  },
  {
    title: "What's Not Covered",
    items: [
      "Accidental damage or drops",
      "Water damage after repair",
      "Unauthorized modifications",
      "Normal wear and tear",
      "Damage from third-party repairs",
    ],
  },
];

export default function WarrantyPage() {
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
              Our Warranty Promise
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              We stand behind our work with comprehensive warranties that give you peace of mind.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
              All repairs are backed by our warranty guarantee, with up to 24‑month cover on selected services like battery replacements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warranty Types */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Warranty Coverage
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {warrantyTypes.map((warranty, index) => {
              const Icon = warranty.icon;
              return (
                <ScrollReveal key={warranty.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
                      {warranty.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">
                      {warranty.description}
                    </p>
                    <ul className="space-y-2">
                      {warranty.coverage.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-600">
                          <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warranty Terms */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Warranty Terms
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {warrantyTerms.map((term, index) => (
              <ScrollReveal key={term.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 flex items-center space-x-2">
                    {term.title === "What's Not Covered" ? (
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    )}
                    <span>{term.title}</span>
                  </h3>
                  <ul className="space-y-3">
                    {term.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-neutral-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              How to Claim Your Warranty
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Contact Us",
                description: "Reach out to us via phone (02081275250) or email (Phonesnmacs40@gmail.com) with your repair receipt and details of the issue.",
              },
              {
                step: "2",
                title: "Assessment",
                description: "We'll assess the issue to determine if it's covered under warranty. This is usually done within 24 hours.",
              },
              {
                step: "3",
                title: "Free Repair",
                description: "If covered, we'll repair your device at no cost. Simply bring it to our store or use our mail-in service.",
              },
            ].map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <div className="flex items-start space-x-4 bg-primary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
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
              Need to Claim Your Warranty?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 px-2">
              Contact us today and we'll help you get your device fixed under warranty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="tel:02081275250"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
              >
                <span>Call Us: 02081275250</span>
              </a>
              <a
                href="mailto:Phonesnmacs40@gmail.com"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-all"
              >
                <span>Email Us</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

