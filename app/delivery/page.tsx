"use client";

import { motion } from "framer-motion";
import { Package, Truck, Clock, Shield, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const deliveryOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    description: "5-7 business days",
    price: "Free",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "2-3 business days",
    price: "£9.99",
  },
  {
    icon: Package,
    title: "Next Day Delivery",
    description: "Order before 2pm",
    price: "£14.99",
  },
];

const returnPolicy = [
  {
    title: "14-Day Returns",
    description: "Return unused items within 14 days of delivery for a full refund.",
  },
  {
    title: "Free Returns",
    description: "We provide free return labels for all returns.",
  },
  {
    title: "Refund Processing",
    description: "Refunds are processed within 5-7 business days of receiving your return.",
  },
];

export default function DeliveryPage() {
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
              Delivery & Returns
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Fast, secure delivery and hassle-free returns for your peace of mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Delivery Options
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {deliveryOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <ScrollReveal key={option.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                      {option.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 mb-3 sm:mb-4">
                      {option.description}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-primary-600">{option.price}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Returns Policy */}
      <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Returns Policy
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {returnPolicy.map((policy, index) => (
              <ScrollReveal key={policy.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
                    {policy.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-700">{policy.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              How to Return an Item
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Contact Us",
                description: "Email us at Phonesnmacs40@gmail.com or call 02081275250 to initiate your return.",
              },
              {
                step: "2",
                title: "Get Return Label",
                description: "We'll send you a free return label via email within 24 hours.",
              },
              {
                step: "3",
                title: "Package & Send",
                description: "Package your item securely and send it back using the provided label.",
              },
              {
                step: "4",
                title: "Receive Refund",
                description: "Once we receive and inspect your return, we'll process your refund within 5-7 business days.",
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
    </div>
  );
}

