"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, CheckCircle2, ShoppingBag } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const accessories = [
  {
    id: "wireless-chargers",
    name: "Wireless Chargers",
    description: "Fast and convenient charging solutions",
    image: "/images/mobile.png",
    category: "Charging",
  },
  {
    id: "cables",
    name: "Charging Cables",
    description: "Durable and fast charging cables",
    image: "/images/mobile.png",
    category: "Charging",
  },
  {
    id: "laptop-sleeves",
    name: "Laptop Sleeves",
    description: "Protect your laptop in style",
    image: "/images/laptop.jpg",
    category: "Protection",
  },
  {
    id: "tablet-cases",
    name: "Tablet Cases",
    description: "Stylish protection for your tablet",
    image: "/images/tablet.jpg",
    category: "Protection",
  },
  {
    id: "power-banks",
    name: "Power Banks",
    description: "Stay charged on the go",
    image: "/images/mobile.png",
    category: "Charging",
  },
  {
    id: "headphones",
    name: "Headphones & Earbuds",
    description: "Premium audio accessories",
    image: "/images/mobile.png",
    category: "Audio",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All accessories are tested and certified for quality",
  },
  {
    icon: CheckCircle2,
    title: "Perfect Fit",
    description: "Compatible with all major device models",
  },
  {
    icon: ShoppingBag,
    title: "Easy Returns",
    description: "30-day return policy on all accessories",
  },
];

export default function AccessoriesPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 sm:py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Premium Accessories to Protect & Enhance Your Device
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              Discover our range of high-quality accessories designed to keep your devices safe and enhance your experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Find the perfect accessory for your needs
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Protection", "Charging", "Audio", "Storage"].map((category, index) => (
              <ScrollReveal key={category} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 text-center cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                    {category}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Browse {category.toLowerCase()} accessories
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Featured Accessories
            </h2>
            <p className="text-lg text-neutral-600">
              Best sellers and new arrivals
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full p-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary-600 mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {item.description}
                    </p>
                    <Link
                      href={`/accessories/${item.id}`}
                      className="inline-flex items-center space-x-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Choose Our Accessories?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={benefit.title} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Protect Your Device?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Browse our full range of accessories and find the perfect match for your device.
            </p>
            <Link
              href="/select-device"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

