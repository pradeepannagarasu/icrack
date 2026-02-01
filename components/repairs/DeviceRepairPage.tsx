"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Smartphone, Battery, Camera, Wrench, Layout } from "lucide-react";
import { Brand, Model, RepairType } from "@/types";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage, getRepairImage } from "@/lib/deviceImages";
import DeviceRepairFAQ from "@/components/repairs/DeviceRepairFAQ";
import RepairDetailCard from "@/components/repairs/RepairDetailCard";
import { getRepairPricing, getRepairDescription, getRepairTitle } from "@/lib/pricing";
import CallOutServiceBanner from "@/components/repairs/CallOutServiceBanner";
import BackLink from "@/components/ui/BackLink";

interface DeviceRepairPageProps {
  brand: Brand;
  device: Model;
  repairs: RepairType[];
}

// 5 top-level categories (iSmash-style: selectors on top, sub-options inside one panel)
const REPAIR_CATEGORIES = [
  { id: "screen" as const, label: "Front screen", icon: Smartphone },
  { id: "back-cover" as const, label: "Back cover", icon: Layout },
  { id: "battery-charging" as const, label: "Battery & charging", icon: Battery },
  { id: "camera" as const, label: "Camera (front or rear)", icon: Camera },
  { id: "other" as const, label: "Other repairs", icon: Wrench },
] as const;

type CategoryId = (typeof REPAIR_CATEGORIES)[number]["id"];

export default function DeviceRepairPage({
  brand,
  device,
  repairs,
}: DeviceRepairPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<
    "front" | "rear" | "lens" | "replacement" | "original" | "regular" | "glass" | "housing" | "port" | "dock" | undefined
  >(undefined);

  if (!brand?.id || !device?.id) {
    return null;
  }

  const isMacBook = device.id.includes("macbook") || device.id.includes("mac");
  const filteredRepairs = isMacBook
    ? (repairs || []).filter((repair) => repair?.id === "battery")
    : (repairs || []);
  const otherRepairIds = ["water-damage", "speaker", "earpiece", "diagnostics", "software", "home-button"];
  const otherRepairs = filteredRepairs.filter((r) => r?.id && otherRepairIds.includes(r.id));

  const handleCategorySelect = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setSelectedRepair(null);
    setSelectedSubType(undefined);
  };

  const handleBackFromDetail = () => {
    if (selectedSubType !== undefined || (selectedCategory === "other" && selectedRepair)) {
      setSelectedSubType(undefined);
      setSelectedRepair(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const getSelectedRepairData = () => {
    // "Other": selectedRepair is the repair id (water-damage, earpiece, etc.)
    if (selectedCategory === "other" && selectedRepair) {
      const repairType = selectedRepair === "speaker" || selectedRepair === "home-button" ? "earpiece" : selectedRepair;
      const pricing = getRepairPricing(device.id, repairType);
      const repair = repairs.find((r) => r?.id === selectedRepair || r?.id === repairType);
      if (!repair) return null;
      return {
        repairId: repairType,
        title: repair.name,
        price: pricing?.price ?? 0,
        saveAmount: pricing?.save,
        description: repair.description,
        warranty: repair.warranty,
        repairTime: repair.duration,
        variants: undefined,
        subType: undefined,
      };
    }
    // Need category + sub-option chosen (subType or for battery-charging selectedRepair)
    if (!selectedCategory) return null;
    if (selectedCategory === "screen" || selectedCategory === "back-cover" || selectedCategory === "camera") {
      if (selectedSubType === undefined) return null;
      let repairType = selectedCategory === "back-cover" ? "back-cover" : selectedCategory;
      let pricingSubType = selectedSubType;
      if (repairType === "camera" && selectedSubType === "replacement") pricingSubType = "rear";
      const pricing = getRepairPricing(device.id, repairType, pricingSubType as any);
      if (!pricing) return null;
      return {
        repairId: repairType,
        title: getRepairTitle(repairType, device.name, selectedSubType),
        price: pricing.price,
        saveAmount: pricing.save,
        description: getRepairDescription(repairType, device.name, selectedSubType),
        warranty: pricing.warranty,
        repairTime: pricing.time,
        variants: pricing.variants,
        subType: selectedSubType,
      };
    }
    if (selectedCategory === "battery-charging") {
      const repairType = selectedRepair === "charging-port" ? "charging-port" : "battery";
      if (!selectedRepair || selectedSubType === undefined) return null;
      const pricing = getRepairPricing(device.id, repairType, selectedSubType as "original" | "regular" | "port" | "dock");
      if (!pricing) return null;
      return {
        repairId: repairType,
        title: getRepairTitle(repairType, device.name, selectedSubType),
        price: pricing.price,
        saveAmount: pricing.save,
        description: getRepairDescription(repairType, device.name, selectedSubType),
        warranty: pricing.warranty,
        repairTime: pricing.time,
        variants: pricing.variants,
        subType: selectedSubType,
      };
    }
    return null;
  };

  const selectedRepairData = getSelectedRepairData();
  const showSubOptions = selectedCategory && !selectedRepairData;

  return (
    <div className="pt-20">
      {/* Progress Indicator + Back */}
      <section className="bg-white border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <BackLink label="Go back" />
          </div>
          <div className="flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-base">
            {/* Step 1: Brand - Completed */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-primary-600 font-semibold hidden sm:inline">{brand.name}</span>
            </div>
            <div className="w-8 h-0.5 bg-primary-600"></div>
            
            {/* Step 2: Device - Completed */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-primary-600 font-semibold hidden sm:inline">{device.name}</span>
            </div>
            <div className="w-8 h-0.5 bg-primary-600"></div>
            
            {/* Step 3: Repair - Current */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">3</span>
              </div>
              <span className="text-primary-600 font-semibold hidden sm:inline">Repair</span>
            </div>
            <div className="w-8 h-0.5 bg-neutral-200"></div>
            
            {/* Step 4: Details - Future */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-neutral-300 flex items-center justify-center">
                <span className="text-neutral-400 text-sm font-semibold">4</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              {device.name} Screen Replacement & Other Repairs
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              {device.name} Repairs
            </h2>
            <div className="prose prose-neutral max-w-none text-left">
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 mb-3 sm:mb-4 px-2">
                If your {device.name} is damaged, whether it is a broken screen, cracked camera or if you need a {device.name} battery replacement, we understand that you would want this repaired in no time so you can go back to enjoying the great features of the {device.name}.
              </p>
              <details className="group">
                <summary className="cursor-pointer text-primary-600 font-semibold list-none">
                  Read More <span className="inline-block group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="mt-4 space-y-4 text-neutral-700">
                  <p>
                    No matter how little the crack on your screen is, the complete screen will need to be replaced and you will only need to wait around 30 minutes for your {device.name} to be repaired.
                  </p>
                  <p>
                    If it is a {device.name} replacement battery service that you need we can replace it in as little as 30 minutes. You may need a {device.name} battery replacement if your device is running a little slower than usual, if it has a low battery life or if it has stopped charging altogether. If this sounds like your situation then book a repair appointment for your {device.name} battery at your nearest iCrack store today.
                  </p>
                  <p>
                    We specialise in {device.name} screen replacement & {device.name} screen repairs and rest assured that we will fix your {device.name} and get you back up and running.
                  </p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Repair Type Selection – 5 top selectors (iSmash-style), one detail panel with sub-options inside */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
              What needs repair?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
              Select the repair service for your {brand.name} {device.name}
            </p>
          </div>

          {/* 5 category selectors – horizontal tabs (like iSmash) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {REPAIR_CATEGORIES.filter((c) => (isMacBook ? c.id === "battery-charging" : true)).map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] py-4 px-3 sm:py-5 sm:px-4 rounded-xl border-2 transition-all ${
                    isActive ? "border-primary-600 bg-primary-50 shadow-md" : "border-neutral-200 bg-white hover:border-primary-300"
                  }`}
                >
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 ${isActive ? "text-primary-600" : "text-neutral-600"}`} />
                  <span className={`text-xs sm:text-sm font-semibold text-center leading-tight ${isActive ? "text-primary-600" : "text-neutral-700"}`}>
                    {cat.label}
                  </span>
                  {isActive && (
                    <span className="mt-1.5 block w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary-600" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* One detail panel (pink border) – sub-options inside, or RepairDetailCard after selection */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-primary-300 bg-white p-6 sm:p-8 shadow-sm"
            >
              <button
                type="button"
                onClick={handleBackFromDetail}
                className="mb-6 text-primary-600 hover:text-primary-700 font-semibold transition-colors flex items-center gap-2"
              >
                <span>←</span> Back
              </button>

              {/* Sub-options inside panel (split two prices etc.) */}
              {showSubOptions && selectedCategory === "screen" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary-600 mb-1">
                    Genuine {device.name} Screen Replacement
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6">Choose your screen option below.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {(["original", "regular"] as const).map((subType) => {
                      const pricing = getRepairPricing(device.id, "screen", subType);
                      const title = subType === "original" ? "Original Screen" : "Standard Screen";
                      return (
                        <motion.button
                          key={subType}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedRepair("screen"); setSelectedSubType(subType); }}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all"
                        >
                          <div className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">{title}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">£{pricing?.price ?? "—"}</div>
                          <p className="text-sm text-neutral-600">Select & book →</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSubOptions && selectedCategory === "back-cover" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary-600 mb-1">Back Glass Replacement</h3>
                  <p className="text-sm text-neutral-600 mb-6">Choose your option below.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      { id: "glass" as const, label: "Back glass only", subtitle: "Replace just the cracked glass" },
                      { id: "housing" as const, label: "Back glass & housing", subtitle: "Full rear housing replacement" },
                    ].map((opt) => {
                      const pricing = getRepairPricing(device.id, "back-cover", opt.id);
                      return (
                        <motion.button
                          key={opt.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedRepair("back-cover"); setSelectedSubType(opt.id); }}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all"
                        >
                          <div className="font-semibold text-neutral-900 mb-1">{opt.label}</div>
                          <div className="text-2xl font-bold text-primary-600 mb-1">£{pricing?.price ?? "—"}</div>
                          <div className="text-sm text-neutral-600">{opt.subtitle}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSubOptions && selectedCategory === "battery-charging" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary-600 mb-1">Battery & Charging</h3>
                  <p className="text-sm text-neutral-600 mb-6">Choose one option below.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { repair: "battery", subType: "original" as const, label: "Original Battery" },
                      { repair: "battery", subType: "regular" as const, label: "Standard Battery" },
                      { repair: "charging-port", subType: "port" as const, label: "Charging Port" },
                      { repair: "charging-port", subType: "dock" as const, label: "Charging Dock" },
                    ].map((opt) => {
                      const pricing = getRepairPricing(device.id, opt.repair, opt.subType);
                      return (
                        <motion.button
                          key={`${opt.repair}-${opt.subType}`}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedRepair(opt.repair); setSelectedSubType(opt.subType); }}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all"
                        >
                          <div className="font-semibold text-neutral-900 text-sm mb-1">{opt.label}</div>
                          <div className="text-xl font-bold text-primary-600">£{pricing?.price ?? "—"}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSubOptions && selectedCategory === "camera" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary-600 mb-1">Camera (front or rear)</h3>
                  <p className="text-sm text-neutral-600 mb-6">Choose one option below.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { subType: "rear" as const, label: "Rear Camera Replacement" },
                      { subType: "front" as const, label: "Front Camera (Face ID)" },
                      { subType: "lens" as const, label: "Rear Camera Lens" },
                    ].map((opt) => {
                      const pricing = getRepairPricing(device.id, "camera", opt.subType === "rear" ? "rear" : opt.subType);
                      return (
                        <motion.button
                          key={opt.subType}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedRepair("camera"); setSelectedSubType(opt.subType === "rear" ? "rear" : opt.subType === "front" ? "front" : "lens"); }}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all"
                        >
                          <div className="font-semibold text-neutral-900 mb-1">{opt.label}</div>
                          <div className="text-2xl font-bold text-primary-600">£{pricing?.price ?? "—"}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSubOptions && selectedCategory === "other" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary-600 mb-1">Other repairs</h3>
                  <p className="text-sm text-neutral-600 mb-6">Select the repair you need.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherRepairs.map((repair) => {
                      const repairId = repair.id === "speaker" || repair.id === "home-button" ? "earpiece" : repair.id;
                      const pricing = getRepairPricing(device.id, repairId);
                      return (
                        <motion.button
                          key={repair.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedRepair(repair.id); setSelectedSubType(undefined); }}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-5 text-left hover:border-primary-500 hover:shadow-lg transition-all"
                        >
                          <div className="font-semibold text-neutral-900 mb-1">{repair.name}</div>
                          <div className="text-xl font-bold text-primary-600">£{pricing?.price ?? "—"}</div>
                          <div className="text-sm text-neutral-600 mt-1">{repair.duration} · {repair.warranty}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Single repair detail card after user picks a sub-option */}
              {selectedRepairData && (
                <RepairDetailCard
                  repairId={selectedRepairData.repairId}
                  title={selectedRepairData.title}
                  price={selectedRepairData.price}
                  saveAmount={selectedRepairData.saveAmount}
                  description={selectedRepairData.description}
                  warranty={selectedRepairData.warranty}
                  repairTime={selectedRepairData.repairTime}
                  variants={selectedRepairData.variants}
                  deviceId={device.id}
                  brandId={brand.id}
                />
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call-out Service Banner */}
      <CallOutServiceBanner />

      {/* Upgrade Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                Is it time for an upgrade?
              </h2>
              <p className="text-lg text-neutral-700 mb-8">
                We love repairing devices. Our expert technicians can fix your device in no time.
              </p>
              <p className="text-base text-neutral-600 mb-8">
                However, why not treat yourself to an upgrade? A new device can offer better battery life, faster performance and enhanced security.
              </p>
              <Link
                href="/refurbished"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl"
              >
                <span>View all devices</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-8">
              Repair your {device.name} with confidence.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Extended Warranty", icon: "🛡️" },
              { title: "Express Repairs", icon: "⚡" },
              { title: "Price Promise", icon: "💰" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-neutral-900 text-sm md:text-base">{item.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8">
            {[
              "Qualified engineers",
              "Quality parts",
              "Backed by warranty",
              "Express repairs",
              "Walk-in nationwide",
              "Mail-in service",
              "Klarna available",
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex items-center space-x-2 text-neutral-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              FAQs About the {device.name} Repairs
            </h2>
            <p className="text-lg text-neutral-600">
              Here are some of the most common questions we get asked around {device.name} Repairs - select your issue and see what we can do for you.
            </p>
          </ScrollReveal>
          <DeviceRepairFAQ deviceName={device.name} />
        </div>
      </section>
    </div>
  );
}
