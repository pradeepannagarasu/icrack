"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Brand, Model, RepairType } from "@/types";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import { getBrandsByCategory } from "@/lib/categoryFilters";
import type { DeviceCategory } from "@/lib/categoryFilters";
import ProgressIndicator from "./ProgressIndicator";
import DeviceTypeStep from "./steps/DeviceTypeStep";
import BrandStep from "./steps/BrandStep";
import AppleSubcategoryStep from "../booking/steps/AppleSubcategoryStep";
import ModelStep from "./steps/ModelStep";
import RepairStep from "./steps/RepairStep";
import BookingStep from "./steps/BookingStep";

const REPAIR_BRAND_IDS = ["apple", "samsung", "google"];

type Step = "device-type" | "brand" | "apple-subcategory" | "model" | "repair" | "book";

export default function DeviceSelectorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("device-type");
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState<DeviceCategory | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedAppleCategory, setSelectedAppleCategory] = useState<"phones" | "tablets" | "laptops" | null>(null);
  const [selectedAppleSubcategory, setSelectedAppleSubcategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<RepairType | null>(null);

  const repairs = repairsData.repairTypes as RepairType[];

  const brandsForStep = useMemo(() => {
    if (!selectedDeviceCategory) return [];
    return getBrandsByCategory(selectedDeviceCategory).filter((b) =>
      REPAIR_BRAND_IDS.includes(b.id)
    );
  }, [selectedDeviceCategory]);

  const showAppleSubcategory =
    selectedBrand?.id === "apple" &&
    (selectedAppleCategory === "tablets" || selectedAppleCategory === "laptops");

  const steps: { id: Step; label: string }[] = [
    { id: "device-type", label: "Device" },
    { id: "brand", label: "Brand" },
    ...(showAppleSubcategory ? [{ id: "apple-subcategory" as Step, label: "Category" }] : []),
    { id: "model", label: "Model" },
    { id: "repair", label: "Repair" },
    { id: "book", label: "Book" },
  ];

  const handleDeviceTypeSelect = (category: DeviceCategory) => {
    setSelectedDeviceCategory(category);
    setSelectedBrand(null);
    setSelectedAppleCategory(null);
    setSelectedAppleSubcategory(null);
    setSelectedModel(null);
    setSelectedRepair(null);
    setCurrentStep("brand");
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedAppleSubcategory(null);
    setSelectedModel(null);
    setSelectedRepair(null);
    if (brand.id === "apple") {
      setSelectedAppleCategory(selectedDeviceCategory ?? null);
      if (selectedDeviceCategory === "tablets" || selectedDeviceCategory === "laptops") {
        setCurrentStep("apple-subcategory");
      } else {
        setCurrentStep("model");
      }
    } else {
      setSelectedAppleCategory(null);
      setCurrentStep("model");
    }
  };

  const handleAppleSubcategorySelect = (subcategoryId: string) => {
    setSelectedAppleSubcategory(subcategoryId);
    setSelectedModel(null);
    setSelectedRepair(null);
    setCurrentStep("model");
  };

  const handleModelSelect = (model: Model) => {
    if (!model?.id) return;
    setSelectedModel(model);
    setSelectedRepair(null);
    let category = "phones";
    const brandId = selectedBrand?.id;

    if (selectedBrand) {
      if (brandId === "apple") {
        if (selectedAppleCategory === "tablets") {
          category = "tablets";
        } else if (selectedAppleCategory === "phones") {
          category = "iphone";
        } else if (selectedAppleCategory === "laptops") {
          category = "laptops";
        } else {
          if (model.id.includes("ipad")) category = "tablets";
          else if (model.id.includes("iphone")) category = "iphone";
          else if (model.id.includes("macbook") || model.id.includes("mac")) category = "laptops";
        }
      } else if (brandId === "samsung") {
        category = model.id.includes("tab") ? "tablets" : "phones";
      } else {
        if (model.id.includes("tab") || model.id.includes("ipad")) category = "tablets";
        else if (model.id.includes("macbook") || model.id.includes("mac") || model.id.includes("xps") || model.id.includes("spectre") || model.id.includes("thinkpad") || model.id.includes("yoga") || model.id.includes("inspiron") || model.id.includes("envy") || model.id.includes("pavilion") || model.id.includes("elitebook") || model.id.includes("ideapad") || model.id.includes("latitude")) category = "laptops";
        else category = "phones";
      }
    } else {
      if (model.id.includes("tab") || model.id.includes("ipad")) category = "tablets";
      else if (model.id.includes("macbook") || model.id.includes("mac")) category = "laptops";
    }

    router.push(`/repairs/${category}/${model.id}`);
  };

  const handleRepairSelect = (repair: RepairType) => {
    setSelectedRepair(repair);
    setCurrentStep("book");
  };

  const handleBook = () => {
    // Navigate to booking page with pre-filled data
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand.id);
    if (selectedModel) params.set("model", selectedModel.id);
    if (selectedRepair) params.set("repair", selectedRepair.id);
    router.push(`/book?${params.toString()}`);
  };

  const handleBack = () => {
    switch (currentStep) {
      case "brand":
        setCurrentStep("device-type");
        setSelectedDeviceCategory(null);
        setSelectedBrand(null);
        setSelectedAppleCategory(null);
        break;
      case "apple-subcategory":
        setCurrentStep("brand");
        setSelectedAppleSubcategory(null);
        break;
      case "model":
        if (selectedBrand?.id === "apple" && selectedAppleSubcategory) {
          setCurrentStep("apple-subcategory");
          setSelectedAppleSubcategory(null);
        } else {
          setCurrentStep("brand");
          setSelectedBrand(null);
        }
        setSelectedModel(null);
        break;
      case "repair":
        setCurrentStep("model");
        setSelectedModel(null);
        break;
      case "book":
        setCurrentStep("repair");
        setSelectedRepair(null);
        break;
    }
  };

  const canGoBack = currentStep !== "device-type";

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 flex flex-col">
      {/* Progress Indicator */}
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator
            steps={steps}
            currentStep={currentStep}
            selectedBrand={selectedBrand?.name}
            selectedModel={selectedModel?.name}
            selectedRepair={selectedRepair?.name}
          />
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {currentStep === "device-type" && (
              <motion.div
                key="device-type"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex justify-center"
              >
                <DeviceTypeStep onSelect={handleDeviceTypeSelect} />
              </motion.div>
            )}

            {currentStep === "brand" && selectedDeviceCategory && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <BrandStep
                  brands={brandsForStep}
                  onSelect={handleBrandSelect}
                  selectedBrand={selectedBrand}
                />
              </motion.div>
            )}

            {currentStep === "apple-subcategory" &&
              selectedBrand?.id === "apple" &&
              (selectedAppleCategory === "tablets" || selectedAppleCategory === "laptops") && (
              <motion.div
                key="apple-subcategory"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AppleSubcategoryStep
                  type={selectedAppleCategory}
                  onSelect={handleAppleSubcategorySelect}
                />
              </motion.div>
            )}

            {currentStep === "model" && selectedBrand && (
              <motion.div
                key="model"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ModelStep
                  brand={selectedBrand}
                  onSelect={handleModelSelect}
                  selectedModel={selectedModel}
                  category={selectedAppleCategory || undefined}
                  subcategory={selectedAppleSubcategory ?? undefined}
                />
              </motion.div>
            )}

            {currentStep === "repair" && selectedBrand && selectedModel && (
              <motion.div
                key="repair"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <RepairStep
                  repairs={repairs}
                  onSelect={handleRepairSelect}
                  selectedRepair={selectedRepair}
                />
              </motion.div>
            )}

            {currentStep === "book" &&
              selectedBrand &&
              selectedModel &&
              selectedRepair && (
                <motion.div
                  key="book"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <BookingStep
                    brand={selectedBrand}
                    model={selectedModel}
                    repair={selectedRepair}
                    onBook={handleBook}
                  />
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>

      {/* Back Button */}
      {canGoBack && (
        <div className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleBack}
              className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-neutral-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

