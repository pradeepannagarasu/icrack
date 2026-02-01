"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface DeviceModel {
  id: string;
  name: string;
}

interface DeviceSelectionGridProps {
  title: string;
  subtitle?: string;
  models: DeviceModel[];
  baseHref: string;
  getImageSrc: (modelId: string) => string;
  fallbackImage?: string;
  columns?: 2 | 3 | 4 | 6;
  /** Optional: show scroll-to-top button */
  showScrollToTop?: boolean;
}

export default function DeviceSelectionGrid({
  title,
  subtitle,
  models,
  baseHref,
  getImageSrc,
  fallbackImage = "/images/mobile.png",
  columns = 4,
  showScrollToTop = false,
}: DeviceSelectionGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-600 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid ${gridCols[columns]} gap-6 md:gap-8 lg:gap-10`}
        >
          {(models || []).filter((m) => m && m.id).map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <Link href={`${baseHref}/${model.id}`} className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all text-center group h-full flex flex-col items-center"
                >
                  {/* Light blue geometric star/cross shape behind device */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rotate-45 rounded-xl opacity-60"
                      style={{ backgroundColor: "#bae6fd" }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rotate-[22.5deg] rounded-lg opacity-50"
                      style={{ backgroundColor: "#7dd3fc" }}
                    />
                  </div>

                  {/* Device image */}
                  <div className="relative z-10 h-36 lg:h-40 w-full flex items-center justify-center mb-4 flex-shrink-0">
                    <Image
                      src={getImageSrc(model.id)}
                      alt={model.name}
                      width={180}
                      height={180}
                      className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-300"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackImage;
                      }}
                    />
                  </div>

                  {/* Model name in pink */}
                  <h3 className="relative z-10 font-semibold text-primary-600 text-base lg:text-lg group-hover:text-primary-700 transition-colors mt-auto">
                    {model.name}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
}
