"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Wrench, Shield, Award } from "lucide-react";
import brandsData from "@/data/brands.json";
import { fadeInUp } from "@/lib/animations";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";
import DeviceSelectionGrid from "@/components/ui/DeviceSelectionGrid";

const allSamsungPhones = (brandsData.brands
  .find((b) => b.id === "samsung")
  ?.models.filter((m) => m && m.id && !m.id.includes("tab")) || []) as { id: string; name: string }[];

type SamsungSeries = "flip-fold" | "s" | "note" | "a";

const SERIES: { id: SamsungSeries; label: string; shortLabel: string }[] = [
  { id: "flip-fold", label: "Samsung Galaxy Flip & Fold Series", shortLabel: "Galaxy Flip & Fold series" },
  { id: "s", label: "Samsung Galaxy S Series", shortLabel: "Galaxy S series" },
  { id: "note", label: "Samsung Galaxy Note Series", shortLabel: "Galaxy Note series" },
  { id: "a", label: "Samsung Galaxy A Series", shortLabel: "Galaxy A series" },
];

function filterBySeries(models: { id: string; name: string }[], series: SamsungSeries) {
  return models.filter((m) => {
    const id = m.id.toLowerCase();
    if (series === "flip-fold") return id.includes("z-fold") || id.includes("z-flip");
    if (series === "s") return id.includes("galaxy-s");
    if (series === "note") return id.includes("note");
    if (series === "a") return id.includes("galaxy-a");
    return false;
  });
}

export default function SamsungRepairsPage() {
  const [selectedSeries, setSelectedSeries] = useState<SamsungSeries | null>(null);
  const modelsInSeries = selectedSeries ? filterBySeries(allSamsungPhones, selectedSeries) : [];

  const seriesLabel = SERIES.find((s) => s.id === selectedSeries)?.shortLabel || selectedSeries;

  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Back Link */}
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-600 mb-4 sm:mb-6">
              Samsung Repairs
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 max-w-3xl mx-auto px-2">
              Expert Samsung phone repairs with 12-month warranty. Fast, professional service from qualified technicians using quality parts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust badges: Qualified Engineers, Genuine Parts, Backed by Warranty */}
      <section className="py-6 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-semibold text-neutral-800">Qualified Engineers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-semibold text-neutral-800">Genuine Parts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-semibold text-neutral-800">Backed by Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Select your Samsung – series or models */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
              Select your Samsung
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {!selectedSeries ? (
              /* Series cards: Galaxy Flip & Fold, S, Note, A */
              <motion.div
                key="series"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
              >
                {SERIES.map((series) => {
                  const count = filterBySeries(allSamsungPhones, series.id).length;
                  return (
                    <motion.button
                      key={series.id}
                      type="button"
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSeries(series.id)}
                      className="relative rounded-2xl border-2 border-primary-200 bg-white p-6 sm:p-8 lg:p-10 text-center hover:border-primary-500 hover:shadow-xl transition-all group overflow-hidden"
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-70">
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rotate-45 rounded-xl"
                          style={{ backgroundColor: "#bae6fd" }}
                        />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-primary-600 mb-2 group-hover:text-primary-700">
                          {series.shortLabel}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3">
                          {count} model{count !== 1 ? "s" : ""}
                        </p>
                        <span className="inline-block text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                          View models →
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              /* Models in selected series – single organised grid */
              <motion.div
                key={selectedSeries}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedSeries(null)}
                  className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to series
                </button>
                <DeviceSelectionGrid
                  title={SERIES.find((s) => s.id === selectedSeries)?.label ?? seriesLabel ?? "Models"}
                  subtitle={`All models in the ${seriesLabel ?? "series"}`}
                  models={modelsInSeries}
                  baseHref="/repairs/phones"
                  getImageSrc={(id) => getModelImage("samsung", id)}
                  fallbackImage="/images/mobile.png"
                  columns={4}
                  showScrollToTop
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
