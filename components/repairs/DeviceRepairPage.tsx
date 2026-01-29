"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Smartphone, Battery, Camera, Droplets, Wrench, HelpCircle } from "lucide-react";
import { Brand, Model, RepairType } from "@/types";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { getModelImage, getRepairImage } from "@/lib/deviceImages";
import DeviceRepairFAQ from "@/components/repairs/DeviceRepairFAQ";
import RepairDetailCard from "@/components/repairs/RepairDetailCard";
import RepairOptionCard from "@/components/repairs/RepairOptionCard";
import { getRepairPricing, getRepairDescription, getRepairTitle } from "@/lib/pricing";
import CallOutServiceBanner from "@/components/repairs/CallOutServiceBanner";
import BackLink from "@/components/ui/BackLink";

interface DeviceRepairPageProps {
  brand: Brand;
  device: Model;
  repairs: RepairType[];
}

// Map repair types from repairs.json to display options
function getRepairOptions(repairs: RepairType[], deviceId?: string) {
  const options: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    warranty: string;
    repairId: string;
    subType?: "original" | "regular" | "lens" | "replacement" | "port" | "dock";
  }> = [];

  repairs.forEach((repair) => {
    // Screen: single card – user then sees compare step (Original vs Standard)
    if (repair.id === "screen") {
      options.push({
        id: "screen",
        title: "Screen Replacement",
        description: "Original or standard replacement screen. Compare options and book.",
        duration: repair.duration,
        warranty: "12 months",
        repairId: "screen",
      });
      return;
    }

    // Battery: single card – user then sees compare step (Original vs Standard)
    if (repair.id === "battery") {
      options.push({
        id: "battery",
        title: "Battery Replacement",
        description: "Original or standard battery. Compare options and book.",
        duration: repair.duration,
        warranty: "24 months",
        repairId: "battery",
      });
      return;
    }

    // Camera: Split into two separate options
    if (repair.id === "camera") {
      options.push({
        id: "camera-lens",
        title: "Camera Lens Repair",
        description: "Replace cracked or damaged camera lens glass. Quick and affordable repair.",
        duration: repair.duration,
        warranty: repair.warranty,
        repairId: "camera",
        subType: "lens",
      });
      options.push({
        id: "camera-replacement",
        title: "Camera Replacement",
        description: "Full camera module replacement for front or rear camera issues.",
        duration: repair.duration,
        warranty: repair.warranty,
        repairId: "camera",
        subType: "replacement",
      });
      return;
    }

    // Charging Port: Split into two separate options
    if (repair.id === "charging-port") {
      options.push({
        id: "charging-port-repair",
        title: "Charging Port Repair",
        description: "Fix charging port issues, clean and repair damaged ports.",
        duration: repair.duration,
        warranty: repair.warranty,
        repairId: "charging-port",
        subType: "port",
      });
      options.push({
        id: "charging-dock-repair",
        title: "Charging Dock Repair",
        description: "Repair or replace charging dock and connectivity components.",
        duration: repair.duration,
        warranty: repair.warranty,
        repairId: "charging-port",
        subType: "dock",
      });
      return;
    }

    // Map other repair IDs to display options (screen handled above)
    const optionMap: Record<string, { label: string; repairId: string }> = {
      "water-damage": { label: "Water Damage Repair", repairId: "water-damage" },
      "back-glass": { label: "Back Glass Repair", repairId: "back-cover" },
      speaker: { label: "Speaker Repair", repairId: "earpiece" },
      "home-button": { label: "Home Button Repair", repairId: "earpiece" },
    };

    const option = optionMap[repair.id] || { label: repair.name, repairId: repair.id };

    options.push({
      id: repair.id,
      title: option.label,
      description: repair.description,
      duration: repair.duration,
      warranty: repair.warranty,
      repairId: option.repairId,
    });
  });

  return options;
}

export default function DeviceRepairPage({
  brand,
  device,
  repairs,
}: DeviceRepairPageProps) {
  const [selectedRepair, setSelectedRepair] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<
    "front" | "rear" | "lens" | "replacement" | "original" | "regular" | "glass" | "housing" | "port" | "dock" | undefined
  >(undefined);

  // Filter repairs: For MacBooks, only show battery repairs
  const isMacBook = device.id.includes("macbook") || device.id.includes("mac");
  const filteredRepairs = isMacBook 
    ? repairs.filter((repair) => repair.id === "battery")
    : repairs;

  const repairOptions = getRepairOptions(filteredRepairs, device.id);

  const handleRepairSelect = (repairOption: typeof repairOptions[0]) => {
    setSelectedRepair(repairOption.id);
    if (repairOption.subType) {
      setSelectedSubType(repairOption.subType);
    } else {
      setSelectedSubType(undefined);
    }
  };

  const handleCompareOptionSelect = (repairId: string, subType: "original" | "regular") => {
    setSelectedSubType(subType);
  };

  const getSelectedRepairData = () => {
    if (!selectedRepair) return null;

    const repairOption = repairOptions.find((r) => r.id === selectedRepair);
    if (!repairOption) return null;

    let repairType = repairOption.repairId;
    let subType = repairOption.subType || selectedSubType;

    // Map subType for camera replacement (use "rear" as default)
    let pricingSubType: "front" | "rear" | "lens" | "replacement" | "original" | "regular" | "glass" | "housing" | "port" | "dock" | undefined = subType;
    
    if (repairType === "camera" && subType === "replacement") {
      // For camera replacement, use "rear" as default for pricing lookup
      pricingSubType = "rear";
    }

    // Map charging dock to port (since pricing uses "charging-port")
    if (repairType === "charging-port" && subType === "dock") {
      // Use same pricing structure, but we can differentiate in title/description
      pricingSubType = undefined; // Use base charging-port pricing
    }

    const pricing = getRepairPricing(device.id, repairType, pricingSubType);
    if (!pricing) {
      // Fallback to repair data from repairs.json
      const repair = repairs.find((r) => r.id === selectedRepair);
      if (!repair) return null;
      
      return {
        repairId: repairType,
        title: repairOption.title,
        price: 0, // Will need to add to pricing.json
        saveAmount: undefined,
        description: repair.description,
        warranty: repair.warranty,
        repairTime: repair.duration,
        variants: undefined,
        subType,
      };
    }

    const title = getRepairTitle(repairType, device.name, subType);
    const description = getRepairDescription(repairType, device.name, subType);

    return {
      repairId: repairType,
      title,
      price: pricing.price,
      saveAmount: pricing.save,
      description,
      warranty: pricing.warranty,
      repairTime: pricing.time,
      variants: pricing.variants,
      subType,
    };
  };

  const selectedRepairData = getSelectedRepairData();

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

      {/* Repair Type Selection */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedRepairData ? (
            <>
              {/* Heading */}
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                  What needs repair?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 px-2">
                  Select the repair service for your {brand.name} {device.name}
                </p>
              </div>

              {/* Repair Options Grid - 2 Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {repairOptions.map((option, index) => (
                  <RepairOptionCard
                    key={option.id}
                    id={option.id}
                    title={option.title}
                    description={option.description}
                    duration={option.duration}
                    warranty={option.warranty}
                    repairId={option.repairId}
                    onClick={() => handleRepairSelect(option)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setSelectedRepair(null);
                  setSelectedSubType(undefined);
                }}
                className="mb-6 text-primary-600 hover:text-primary-700 font-semibold transition-colors flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back</span>
              </motion.button>

              {/* Battery: Compare Original vs Standard – split prices, compare & book */}
              {(selectedRepair === "battery" && selectedSubType === undefined) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-900 mb-2 text-center">
                    Choose your battery option
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6 text-center max-w-xl mx-auto">
                    Compare prices and select the option that suits you. Both include 24-month warranty.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {(["original", "regular"] as const).map((subType) => {
                      const pricing = getRepairPricing(device.id, "battery", subType);
                      const title = subType === "original" ? "Original Battery" : "Standard Battery";
                      const description =
                        subType === "original"
                          ? "Premium-grade, calibrated for maximum performance and longevity."
                          : "High-quality replacement – best value to keep you powered all day.";
                      return (
                        <motion.button
                          key={subType}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCompareOptionSelect("battery", subType)}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <div className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
                            {title}
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                            £{pricing?.price ?? "—"}
                          </div>
                          <p className="text-sm text-neutral-600 mb-4">{description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">24-month warranty</span>
                            <span className="text-sm font-semibold text-primary-600">Select & book →</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Screen: Compare Original vs Standard – split prices, compare & book */}
              {(selectedRepair === "screen" && selectedSubType === undefined) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-900 mb-2 text-center">
                    Choose your screen option
                  </h3>
                  <p className="text-sm text-neutral-600 mb-6 text-center max-w-xl mx-auto">
                    Compare prices and select the option that suits you. Both include 12-month warranty.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {(["original", "regular"] as const).map((subType) => {
                      const pricing = getRepairPricing(device.id, "screen", subType);
                      const title = subType === "original" ? "Original Screen" : "Standard Screen";
                      const description =
                        subType === "original"
                          ? "Genuine OEM screen – best quality and colour match."
                          : "High-quality replacement screen – great value.";
                      return (
                        <motion.button
                          key={subType}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCompareOptionSelect("screen", subType)}
                          className="rounded-2xl border-2 border-primary-200 bg-white p-6 text-left hover:border-primary-500 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <div className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
                            {title}
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                            £{pricing?.price ?? "—"}
                          </div>
                          <p className="text-sm text-neutral-600 mb-4">{description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">12-month warranty</span>
                            <span className="text-sm font-semibold text-primary-600">Select & book →</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Back Glass Sub-Options: Glass only vs Housing */}
              {selectedRepair === "back-glass" && !selectedSubType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                >
                  {[
                    {
                      id: "glass" as const,
                      label: "Back glass only",
                      subtitle: "Replace just the cracked glass panel",
                    },
                    {
                      id: "housing" as const,
                      label: "Back glass & housing",
                      subtitle: "Full rear housing replacement for heavy damage",
                    },
                  ].map((subOption) => (
                    <motion.button
                      key={subOption.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSubType(subOption.id)}
                      className="bg-white rounded-2xl p-6 border-2 border-primary-300 hover:border-primary-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="font-semibold text-neutral-900 mb-1">{subOption.label}</div>
                      <div className="text-sm text-neutral-600">{subOption.subtitle}</div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Selected Repair Detail Card (after compare step for battery/screen) */}
              {selectedRepairData &&
                !(selectedRepair === "battery" && selectedSubType === undefined) &&
                !(selectedRepair === "screen" && selectedSubType === undefined) && (
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
            </>
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
