"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { refurbishedIphones, type RefurbishedIphone } from "@/lib/refurbished";

const ALL_CAPACITIES = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];
const ALL_CONDITIONS = ["Fair", "Fair+", "Good", "Very Good", "Excellent", "Like New"];
const MAX_PRICE = Math.max(...refurbishedIphones.map((p) => p.basePrice), 700);

function RefurbishedCard({ phone, showBadge }: { phone: RefurbishedIphone; showBadge?: "save" | "top" }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden flex flex-col h-full">
      <div className="relative p-4 sm:p-5 flex flex-col flex-1">
        {/* Promotional badge */}
        {showBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 rounded-md bg-primary-500 text-white text-xs font-bold shadow">
              {showBadge === "top" ? "Top Deal" : `Save £${phone.basePrice >= 400 ? 190 : 100}`}
            </span>
          </div>
        )}

        {/* Product image */}
        <div className="w-full aspect-[4/3] max-h-40 bg-neutral-50 rounded-lg flex items-center justify-center overflow-hidden mb-3">
          <Image
            src="/images/mobile.png"
            alt={phone.name}
            width={140}
            height={140}
            className="object-contain w-full h-full p-4"
          />
        </div>

        {/* Brand & model */}
        <p className="text-sm text-neutral-500 mb-0.5">iPhone</p>
        <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">{phone.name}</h3>

        {/* Color swatches - circles */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {phone.colours.slice(0, 6).map((c, i) => (
            <span
              key={c}
              title={c}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                i === 0 ? "border-primary-500 ring-1 ring-primary-200" : "border-neutral-300"
              }`}
              style={{
                backgroundColor:
                  c.toLowerCase().includes("black") || c.toLowerCase().includes("midnight")
                    ? "#1a1a1a"
                    : c.toLowerCase().includes("white") || c.toLowerCase().includes("starlight")
                      ? "#f5f5f5"
                      : c.toLowerCase().includes("red")
                        ? "#dc2626"
                        : c.toLowerCase().includes("blue")
                          ? "#2563eb"
                          : c.toLowerCase().includes("green")
                            ? "#16a34a"
                            : c.toLowerCase().includes("pink")
                              ? "#ec4899"
                              : c.toLowerCase().includes("gold")
                                ? "#ca8a04"
                                : c.toLowerCase().includes("purple")
                                  ? "#7c3aed"
                                  : "#e5e5e5",
              }}
            />
          ))}
        </div>

        {/* Storage */}
        <p className="text-sm text-neutral-600 mb-4">
          {phone.storageOptions.join(", ")}
        </p>

        {/* Key benefits - purple block */}
        <div className="rounded-xl bg-accent-800 text-white p-3 mb-4">
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary-400">🚚</span>
              <span>Free Delivery</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-400">😊</span>
              <span>24 Month Warranty</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-400">🔋</span>
              <span>36 Month Battery Guarantee</span>
            </li>
          </ul>
        </div>

        {/* Price & Klarna */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-neutral-900">
            From £{phone.basePrice}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Spread the cost with Klarna
          </p>
        </div>

        {/* View options button */}
        <Link
          href={`/refurbished/${phone.id}`}
          className="block w-full py-3 rounded-xl bg-accent-800 text-white text-center font-semibold hover:bg-accent-700 transition-colors mt-auto"
        >
          View options
        </Link>
      </div>
    </div>
  );
}

export default function RefurbishedPage() {
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [brandApple, setBrandApple] = useState(true);
  const [capacities, setCapacities] = useState<Set<string>>(new Set());
  const [conditions, setConditions] = useState<Set<string>>(new Set());

  const toggleCapacity = (c: string) => {
    setCapacities((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };
  const toggleCondition = (c: string) => {
    setConditions((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return refurbishedIphones.filter((phone) => {
      if (phone.basePrice > priceMax) return false;
      if (brandApple && phone.name.toLowerCase().includes("iphone")) {
        // Apple only - all our data is iPhone
      }
      if (capacities.size > 0) {
        const hasCapacity = phone.storageOptions.some((s) => capacities.has(s));
        if (!hasCapacity) return false;
      }
      if (conditions.size > 0) {
        if (!conditions.has(phone.condition)) return false;
      }
      return true;
    });
  }, [priceMax, brandApple, capacities, conditions]);

  // Badge: Top Deal for SE and iPhone 13, Save for higher-priced
  const getBadge = (phone: RefurbishedIphone): "save" | "top" | undefined => {
    if (phone.id === "iphone-se" || phone.id === "iphone-se-2020" || phone.id === "iphone-13") return "top";
    if (phone.basePrice >= 400) return "save";
    return undefined;
  };

  return (
    <div className="pt-20 lg:pt-[176px] pb-16 min-h-screen bg-neutral-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title - pink */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
            Refurbished Devices
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Premium, fully-tested Apple iPhones with 24-month warranty and multiple colour & storage options.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-display font-bold text-neutral-900">Filters</h2>
              </div>
              <p className="text-primary-600 font-semibold text-sm mb-6">
                {filtered.length} Product{filtered.length !== 1 ? "s" : ""} found
              </p>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary-600 mb-2">Price</label>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <span>£0</span>
                  <input
                    type="range"
                    min={0}
                    max={MAX_PRICE}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none bg-neutral-200 accent-primary-600"
                  />
                  <span>£{priceMax}</span>
                </div>
              </div>

              {/* Brand - Apple only */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary-600 mb-2">Brand</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brandApple}
                    onChange={(e) => setBrandApple(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-neutral-700">Apple</span>
                </label>
              </div>

              {/* Capacity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary-600 mb-2">Capacity</label>
                <div className="space-y-2">
                  {ALL_CAPACITIES.map((c) => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capacities.has(c)}
                        onChange={() => toggleCapacity(c)}
                        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-semibold text-primary-600 mb-2">Condition</label>
                <div className="space-y-2">
                  {ALL_CONDITIONS.map((c) => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={conditions.has(c)}
                        onChange={() => toggleCondition(c)}
                        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main - Product grid */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((phone) => (
                <RefurbishedCard key={phone.id} phone={phone} showBadge={getBadge(phone)} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-neutral-500">
                No refurbished iPhones match your filters. Try adjusting the filters above.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
