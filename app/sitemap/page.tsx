"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const sitemapSections = [
  {
    title: "Services",
    links: [
      { href: "/repairs", label: "Repairs" },
      { href: "/repairs/iphone", label: "iPhone Repairs" },
      { href: "/repairs/tablets", label: "Tablet Repairs" },
      { href: "/repairs/laptops", label: "Laptop Repairs" },
      { href: "/accessories", label: "Accessories" },
      { href: "/refurbished", label: "Refurbished Phones" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/business", label: "Business Services" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/warranty", label: "Our Warranty" },
      { href: "/delivery", label: "Delivery & Returns" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Offers",
    links: [
      { href: "/offers", label: "Offers & Deals" },
      { href: "/student-discount", label: "Student Discount" },
      { href: "/split-payment", label: "Split Your Payment in 3" },
    ],
  },
  {
    title: "Information",
    links: [
      { href: "/environment", label: "Environment" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

export default function SitemapPage() {
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
              Sitemap
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Find all pages and sections of our website
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Links */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sitemapSections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 0.1}>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                    {section.title}
                  </h2>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-sm sm:text-base text-neutral-700 hover:text-primary-600 transition-colors group"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

