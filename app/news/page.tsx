"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const newsItems = [
  {
    date: "2024-01-15",
    title: "New Store Opening in Manchester",
    excerpt: "We're excited to announce the opening of our new store in Manchester city centre.",
    category: "Company News",
  },
  {
    date: "2024-01-10",
    title: "Extended Battery Warranty Now Available",
    excerpt: "All battery replacements now include a 24-month warranty for extra peace of mind.",
    category: "Service Update",
  },
  {
    date: "2024-01-05",
    title: "Klarna Payment Option Now Live",
    excerpt: "Split your payments into 3 interest-free instalments with Klarna.",
    category: "Payment",
  },
];

export default function NewsPage() {
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
              News & Updates
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Stay up to date with the latest news, offers, and updates from iCrack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Items */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {newsItems.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="bg-white border-2 border-neutral-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-primary-600 mb-3 sm:mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-600">{item.category}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">{item.excerpt}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center space-x-2 text-primary-600 font-semibold text-sm sm:text-base hover:text-primary-700 transition-colors group"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

