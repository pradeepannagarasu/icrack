"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import brandsData from "@/data/brands.json";
import { getModelImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";
import DeviceSelectionGrid from "@/components/ui/DeviceSelectionGrid";

const allTabletModels = brandsData.brands
  .find((b) => b.id === "apple")
  ?.models.filter((m) => m.id.includes("ipad")) || [];

type iPadCategory = "ipad" | "ipad-mini" | "ipad-air" | "ipad-pro";

const categories: { id: iPadCategory; name: string }[] = [
  { id: "ipad", name: "iPad" },
  { id: "ipad-air", name: "iPad Air" },
  { id: "ipad-pro", name: "iPad Pro" },
  { id: "ipad-mini", name: "iPad Mini" },
];

function filterModelsByCategory(models: typeof allTabletModels, category: iPadCategory) {
  return models.filter((model) => {
    const id = model.id.toLowerCase();
    if (category === "ipad-pro") return id.includes("ipad-pro");
    if (category === "ipad-air") return id.includes("ipad-air");
    if (category === "ipad-mini") return id.includes("ipad-mini");
    if (category === "ipad") {
      return id.includes("ipad") && !id.includes("ipad-pro") && !id.includes("ipad-air") && !id.includes("ipad-mini");
    }
    return false;
  });
}

/** Sort iPad models: newest first (e.g. iPad Pro 13" before 12.9" before 11") */
function sortModelsForDisplay<T extends { id: string; name: string }>(models: T[]): T[] {
  return [...models].sort((a, b) => {
    const aId = a.id.toLowerCase();
    const bId = b.id.toLowerCase();
    const aParts = aId.split("-").filter(Boolean);
    const bParts = bId.split("-").filter(Boolean);
    const aLast = aParts[aParts.length - 1];
    const bLast = bParts[bParts.length - 1];
    const aNum = parseFloat(aLast ?? "0") || 0;
    const bNum = parseFloat(bLast ?? "0") || 0;
    if (aNum !== bNum) return bNum - aNum;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });
}

const INTRO_SHORT =
  "Are you noticing your iPad's battery life is draining much quicker than it used to? Have you damaged the screen? Or is your home button simply not functioning any more? Do not despair, our team of Tech Repair Specialists can have your iPad fixed and back up and running in no time, with man.....";

const INTRO_FULL = `Are you noticing your iPad's battery life is draining much quicker than it used to? Do you need a replacement screen? Is your iPad struggling to charge? Or is your home button simply not functioning any more? Do not despair, you're in safe hands with iCrack. Our team of Tech Repair Specialists can have your iPad fixed and back up and running in no time, with many repairs being ready in as little as 120 minutes, thanks to our same day repair service.

Our experts can deal with a wide range of issues and services. From battery replacement and liquid damage to software issues and screen replacements, our experienced technicians will get your iPad up and running in no time.

We have been restoring and replacing Apple products since 2013 and have a team of repair specialists who are able to repair everything from the simplest of iPad repairs to the most complex of issues. High skilled technicians conduct all repairs. Get total piece of mind with a free Lifetime warranty on all battery and screen repairs.

If you are unable to visit an iCrack store, we offer a mail in repair service. Use our post service to have your iPad couriered to us and once repaired, have it returned directly to you.`;

export default function TabletsPage() {
  const [expandedCategory, setExpandedCategory] = useState<iPadCategory | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [modelSearch, setModelSearch] = useState("");

  const handleModelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelSearch.trim()) return;
    const found = allTabletModels.find(
      (m) => m.id.toLowerCase().replace(/\s/g, "") === modelSearch.trim().toLowerCase().replace(/\s/g, "") ||
        m.id.toLowerCase().includes(modelSearch.trim().toLowerCase())
    );
    if (found) {
      window.location.href = `/repairs/tablets/${found.id}`;
    }
  };

  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Back Link */}
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>

      {/* Hero: Express + iPad Repairs */}
      <section className="bg-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-1">
            Express
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-600 mb-4">
            iPad Repairs
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl">
            Find your iPad selecting from the list below or by Model Number
          </p>
        </div>
      </section>

      {/* Intro with Read more */}
      <section className="bg-white py-6 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-neutral-700 text-base md:text-lg leading-relaxed">
            {readMore ? INTRO_FULL : INTRO_SHORT}
            <button
              type="button"
              onClick={() => setReadMore(!readMore)}
              className="ml-1 text-primary-600 font-semibold hover:underline focus:outline-none"
            >
              {readMore ? "Read less" : "Read more"}
            </button>
          </div>
        </div>
      </section>

      {/* Step 1: Choose category – iPad, iPad Air, iPad Pro, iPad Mini */}
      <section className="bg-neutral-50 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-600 mb-6 text-center">
            Select your iPad type
          </h2>
          <p className="text-neutral-600 text-center mb-8 max-w-2xl mx-auto">
            Choose iPad, iPad Air, iPad Pro or iPad Mini – then pick your model below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => {
              const isSelected = expandedCategory === cat.id;
              const modelCount = filterModelsByCategory(allTabletModels, cat.id).length;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setExpandedCategory(isSelected ? null : cat.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-2xl border-2 p-6 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-left ${
                    isSelected
                      ? "border-primary-600 bg-primary-50 shadow-lg ring-2 ring-primary-200"
                      : "border-neutral-200 bg-white hover:border-primary-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-neutral-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/ipad.jpg"
                        alt=""
                        className="object-contain w-full h-full p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-lg text-primary-600 block">
                        {cat.name}
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-500 block mt-0.5">
                        {modelCount} model{modelCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary-600 shrink-0 self-center sm:self-auto">
                    {isSelected ? "Hide models" : "Select Device"}
                    {isSelected ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Step 2: Models for selected category – full width, clear layout */}
          <AnimatePresence mode="wait">
            {expandedCategory && (() => {
              const selectedCat = categories.find((c) => c.id === expandedCategory);
              const models = sortModelsForDisplay(filterModelsByCategory(allTabletModels, expandedCategory));
              if (!selectedCat || models.length === 0) return null;
              return (
                <motion.div
                  key={expandedCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 lg:mt-14 pt-8 lg:pt-10 border-t border-neutral-200"
                >
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary-600 mb-2">
                    {selectedCat.name} – Select your model
                  </h3>
                  <p className="text-neutral-600 mb-6 sm:mb-8">
                    {models.length} model{models.length !== 1 ? "s" : ""} available. Tap one to see repair options.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {models.map((model, index) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.25 }}
                      >
                        <Link href={`/repairs/tablets/${model.id}`} className="block h-full">
                          <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative bg-white rounded-2xl p-5 sm:p-6 border-2 border-neutral-200 hover:border-primary-400 hover:shadow-xl transition-all text-center group h-full flex flex-col items-center"
                          >
                            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                              <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rotate-45 rounded-xl opacity-50"
                                style={{ backgroundColor: "#bae6fd" }}
                              />
                            </div>
                            <div className="relative z-10 min-h-[120px] h-28 sm:h-32 lg:h-36 w-full flex items-center justify-center mb-3 flex-shrink-0">
                              <img
                                src={getModelImage("apple", model.id)}
                                alt={model.name}
                                className="object-contain w-full h-full max-h-[120px] sm:max-h-[140px] lg:max-h-[160px] p-2 sm:p-3"
                                onError={(e) => {
                                  const t = e.target as HTMLImageElement;
                                  t.src = "/images/ipad.jpg";
                                }}
                              />
                            </div>
                            <h4 className="relative z-10 font-semibold text-primary-600 text-sm sm:text-base group-hover:text-primary-700 line-clamp-2">
                              {model.name}
                            </h4>
                            <span className="relative z-10 mt-1 text-xs text-neutral-500 group-hover:text-primary-600">
                              View repairs →
                            </span>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* Not sure which iPad? Model number search */}
      <section className="bg-white py-10 lg:py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-2">
            Not sure which iPad you have?
          </h2>
          <p className="text-neutral-600 mb-4">
            Insert the model number below (for example, A1234). You can find it on the reverse side of your iPad or in the settings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <form onSubmit={handleModelSearch} className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="Model Number"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          <Link
            href="/faq"
            className="inline-block mt-4 text-primary-600 font-semibold hover:underline"
          >
            How to find your iPad Model Number?
          </Link>
        </div>
      </section>

      {/* Full model grid - Select Your iPad (all models, same layout as image) */}
      <DeviceSelectionGrid
        title="Select Your iPad"
        subtitle="Choose your iPad model to see available repair options"
        models={allTabletModels}
        baseHref="/repairs/tablets"
        getImageSrc={(id) => getModelImage("apple", id)}
        fallbackImage="/images/ipad.jpg"
        columns={4}
        showScrollToTop
      />
    </div>
  );
}
