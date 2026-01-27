"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";

const tabletModels = brandsData.brands
  .find((b) => b.id === "apple")
  ?.models.filter((m) => m.id.includes("ipad")) || [];

export default function TabletsPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Back Link */}
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              iPad Repairs
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
              Expert iPad repairs with 12-month warranty on all screen replacements and 24-month warranty on battery replacements. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selector */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-4">
              Select Your iPad
            </h2>
            <p className="text-lg text-neutral-600">
              Choose your iPad model to see available repair options
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {tabletModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link href={`/repairs/tablets/${model.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all text-center group"
                  >
                    {/* Diamond-shaped background */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-100/30 rotate-45 rounded-lg"></div>
                    </div>
                    
                    {/* Device image */}
                    <div className="relative z-10 h-32 bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                      <Image
                        src={getModelImage("apple", model.id)}
                        alt={model.name}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/ipad.jpg";
                        }}
                      />
                    </div>
                    
                    {/* Device name in pink */}
                    <h3 className="relative z-10 font-semibold text-primary-600 text-sm group-hover:text-primary-700 transition-colors">
                      {model.name}
                    </h3>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
