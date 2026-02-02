"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navbarVariants } from "@/lib/animations";
import AnnouncementTicker from "./AnnouncementTicker";
import SearchBar from "./SearchBar";
import CartIcon from "@/components/cart/CartIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/repairs", label: "Repairs" },
  { href: "/refurbished", label: "Refurbished Phones" },
  { href: "/business", label: "Business" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Always show on top of page
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show instantly
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      variants={navbarVariants}
      animate={isVisible ? "visible" : "hidden"}
      initial="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Logo row - centered in container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex-1 flex lg:justify-center items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Image
                src="/images/icrack_logo.png"
                alt="iCrack Logo"
                width={200}
                height={55}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                priority
              />
              <span className="ml-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-primary-600">
                iCrack
              </span>
            </motion.div>
          </Link>

          {/* Right side: Search, Cart, Menu (mobile) */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* Cart Icon - Desktop */}
            <div className="hidden lg:block">
              <CartIcon />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Ticker - Full width, edge to edge */}
      <div className="w-full">
        <AnnouncementTicker />
      </div>

      {/* Sub navigation bar - Full width, edge to edge */}
      <div className="hidden lg:block w-full border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left spacer to keep nav centered visually */}
            <div className="w-24" />

            {/* Desktop Navigation - centered */}
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isRepairs = link.label === "Repairs";

                if (isRepairs) {
                  return (
                    <div key={link.href} className="flex items-center space-x-3">
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-neutral-700 hover:text-primary-600 uppercase tracking-wide transition-colors relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
                      </Link>
                      <Link
                        href="/select-device"
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md transition-all"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-neutral-700 hover:text-primary-600 uppercase tracking-wide transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
                  </Link>
                );
              })}
            </nav>

            {/* Right side: Search and Cart */}
            <div className="flex items-center space-x-4 w-24 justify-end">
              <SearchBar />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-neutral-200"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                {/* Mobile Search and Cart */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <SearchBar />
                  </div>
                  <CartIcon />
                </div>
                <Link
                  href="/select-device"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3.5 bg-primary-600 text-white rounded-xl font-semibold text-center hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Book Repair</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

