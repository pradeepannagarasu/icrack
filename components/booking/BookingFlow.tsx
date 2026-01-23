"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressIndicator from "./ProgressIndicator";
import BrandStep from "./steps/BrandStep";
import DeviceStep from "./steps/DeviceStep";
import RepairTypeStep from "./steps/RepairTypeStep";
import BookingFormStep from "./steps/BookingFormStep";
import { Brand, Model, RepairType, BookingData } from "@/types";
import { DeviceCategory } from "@/lib/categoryFilters";

export type BookingStep = "brand" | "device" | "repair" | "form";

interface BookingFlowProps {
  initialStep?: BookingStep;
  onComplete?: (data: BookingData) => void;
  category?: DeviceCategory;
}

export default function BookingFlow({ initialStep = "brand", onComplete, category }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(initialStep);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<RepairType | null>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});

  const steps: { id: BookingStep; label: string }[] = [
    { id: "brand", label: "Brand" },
    { id: "device", label: "Device" },
    { id: "repair", label: "Repair" },
    { id: "form", label: "Details" },
  ];

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedRepair(null);
    setCurrentStep("device");
  };

  const handleDeviceSelect = (model: Model) => {
    setSelectedModel(model);
    setSelectedRepair(null);
    // Navigate directly to the repair page for this device
    // Use provided category or determine category based on brand or model
    let deviceCategory: string;
    if (category) {
      // Use provided category
      deviceCategory = category === "phones" ? "iphone" : category;
    } else {
      // Determine category based on brand or model
      deviceCategory = "iphone"; // default
      if (selectedBrand?.id === "apple") {
        if (model.id.includes("ipad")) {
          deviceCategory = "tablets";
        } else if (model.id.includes("iphone")) {
          deviceCategory = "iphone";
        } else if (model.id.includes("macbook") || model.id.includes("mac")) {
          deviceCategory = "laptops";
        }
      } else if (selectedBrand?.id === "samsung") {
        if (model.id.includes("tab")) {
          deviceCategory = "tablets";
        } else {
          deviceCategory = "phones";
        }
      } else {
        deviceCategory = "phones";
      }
    }
    
    // Use window.location for navigation outside the component
    window.location.href = `/repairs/${deviceCategory}/${model.id}`;
  };

  const handleRepairSelect = (repair: RepairType) => {
    setSelectedRepair(repair);
    setBookingData({
      brand: selectedBrand?.id || "",
      model: selectedModel?.id || "",
      repairType: repair.id,
    });
    setCurrentStep("form");
  };

  const handleFormSubmit = (formData: Partial<BookingData>) => {
    const completeData: BookingData = {
      brand: selectedBrand?.id || "",
      model: selectedModel?.id || "",
      repairType: selectedRepair?.id || "",
      customerName: formData.customerName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      location: formData.location,
      message: formData.message,
    };
    
    if (onComplete) {
      onComplete(completeData);
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "device":
        setCurrentStep("brand");
        setSelectedBrand(null);
        break;
      case "repair":
        setCurrentStep("device");
        setSelectedModel(null);
        break;
      case "form":
        setCurrentStep("repair");
        setSelectedRepair(null);
        break;
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const canGoBack = currentStep !== "brand";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        selectedBrand={selectedBrand?.name}
        selectedModel={selectedModel?.name}
        selectedRepair={selectedRepair?.name}
      />

      {/* Step Content */}
      <div className="mt-8 relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {currentStep === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BrandStep onSelect={handleBrandSelect} category={category} />
            </motion.div>
          )}

          {currentStep === "device" && selectedBrand && (
            <motion.div
              key="device"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DeviceStep
                brand={selectedBrand}
                onSelect={handleDeviceSelect}
                category={category}
              />
            </motion.div>
          )}

          {currentStep === "repair" && selectedBrand && selectedModel && (
            <motion.div
              key="repair"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RepairTypeStep
                brand={selectedBrand}
                model={selectedModel}
                onSelect={handleRepairSelect}
              />
            </motion.div>
          )}

          {currentStep === "form" && selectedBrand && selectedModel && selectedRepair && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BookingFormStep
                brand={selectedBrand}
                model={selectedModel}
                repair={selectedRepair}
                onSubmit={handleFormSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back Button */}
      {canGoBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBack}
          className="mt-6 px-6 py-2 text-neutral-600 hover:text-primary-600 font-medium transition-colors flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
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
      )}
    </div>
  );
}

