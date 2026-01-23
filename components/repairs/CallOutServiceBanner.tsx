"use client";

import { motion } from "framer-motion";
import { Home, Clock, MapPin, Shield } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CallOutServiceBanner() {
  return (
    <section className="py-10 bg-gradient-to-r from-primary-50 via-white to-accent-50 border-y border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          {/* Icon + Headline */}
          <div className="flex items-start gap-4 max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-md">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-600 mb-1">
                Call-out repair service
              </p>
              <h3 className="text-xl md:text-2xl font-display font-bold text-neutral-900">
                We come to your doorstep – repairs in 12–24 hours after booking
              </h3>
              <p className="mt-2 text-sm md:text-base text-neutral-700">
                Available on all major repairs including screen, battery, charging port, camera,
                water damage, diagnostics and software issues. Hassle-free service at your home
                or workplace.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:max-w-xl">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex items-start gap-3 bg-white/80 rounded-2xl px-4 py-3 shadow-sm border border-primary-100"
            >
              <Clock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">12–24 hour response</p>
                <p className="text-xs text-neutral-600">
                  Book today and we aim to reach you within 12–24 hours.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex items-start gap-3 bg-white/80 rounded-2xl px-4 py-3 shadow-sm border border-primary-100"
            >
              <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">At home or work</p>
                <p className="text-xs text-neutral-600">
                  Technician visits your chosen address – no need to travel.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex items-start gap-3 bg-white/80 rounded-2xl px-4 py-3 shadow-sm border border-primary-100"
            >
              <Shield className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Same warranty cover</p>
                <p className="text-xs text-neutral-600">
                  Call-out repairs include the same 12‑month warranty and quality parts.
                </p>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


