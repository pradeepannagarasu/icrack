"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const footerLinks = {
  services: [
    { href: "/repairs", label: "Phone Repairs" },
    { href: "/repairs/iphone", label: "iPhone Repair" },
    { href: "/repairs/samsung", label: "Samsung Repair" },
    { href: "/accessories", label: "Accessories" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/business", label: "Business Services" },
    { href: "/locations", label: "Locations" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/warranty", label: "Warranty" },
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Section - 3 Columns with Borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/10 pb-12 mb-8">
            {/* Newsletter Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-6 md:border-r border-white/10"
            >
              <h3 className="text-2xl font-display font-bold text-primary-400 mb-4">
                Newsletter
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Join our newsletter for the latest offers and product news
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="flex items-center space-x-3 mt-6">
                <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </motion.div>

            {/* Supporting Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-6 md:border-r border-white/10"
            >
              <h3 className="text-2xl font-display font-bold text-primary-400 mb-4">
                Supporting Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Our Warranty", href: "/warranty" },
                  { label: "Split Your Payment in 3", href: "/split-payment" },
                  { label: "About iCrack", href: "/about" },
                  { label: "News", href: "/news" },
                  { label: "Blog", href: "/blog" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Our Privacy Policy", href: "/privacy" },
                  { label: "iCrack Offers & Deals", href: "/offers" },
                  { label: "Student Discount", href: "/student-discount" },
                  { label: "Environment", href: "/environment" },
                  { label: "FAQ & Contact Us", href: "/faq" },
                  { label: "Business Customers", href: "/business" },
                  { label: "Delivery & Returns", href: "/delivery" },
                  { label: "Sitemap", href: "/sitemap" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Smartphone Repairs Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-6"
            >
              <h3 className="text-2xl font-display font-bold text-primary-400 mb-4">
                Smartphone Repairs
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "iPhone Repairs", href: "/repairs/iphone" },
                  { label: "Samsung Repairs", href: "/repairs/samsung" },
                  { label: "Google Repairs", href: "/repairs/google" },
                  { label: "All Phone Repairs", href: "/repairs" },
                  { label: "Book Appointment", href: "/select-device" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section - Light Blue/Grey Background */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white/60 text-sm mb-2">
                  Copyright © {new Date().getFullYear()} All rights reserved
                </p>
                <p className="text-white/50 text-xs">
                  iCrack (UK) Trading Limited registered in England and Wales under the company registration number 09347088. Registered office address: Holborn Gate, 330 High Holborn, London, England, WC1V 7PP
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/terms" className="text-white/60 hover:text-primary-400 transition-colors text-sm underline">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-white/60 hover:text-primary-400 transition-colors text-sm underline">
                  Privacy Notice
                </Link>
                <Link href="/privacy" className="text-white/60 hover:text-primary-400 transition-colors text-sm underline">
                  Cookie Settings
                </Link>
                <Link href="/privacy" className="text-white/60 hover:text-primary-400 transition-colors text-sm underline">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition-all z-40 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </>
  );
}
