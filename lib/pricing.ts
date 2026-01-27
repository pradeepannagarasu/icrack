/**
 * Pricing Utility
 * Gets pricing information for repairs based on device and repair type
 */

import pricingData from "@/data/pricing.json";

interface RepairPricing {
  price: number;
  save?: number;
  warranty: string;
  time: string;
  variants?: string[];
}

interface PricingData {
  repairs: {
    [repairType: string]: {
      basePrice: number;
  devices: {
    [deviceId: string]:
      | RepairPricing
      | {
          front?: RepairPricing;
          rear?: RepairPricing;
          lens?: RepairPricing;
          original?: RepairPricing;
          regular?: RepairPricing;
          glass?: RepairPricing;
          housing?: RepairPricing;
        };
  };
    };
  };
}

const pricing = pricingData as PricingData;

/**
 * Get pricing for a specific repair
 */
export function getRepairPricing(
  deviceId: string,
  repairType: string,
  subType?: "front" | "rear" | "lens" | "replacement" | "original" | "regular" | "glass" | "housing" | "port" | "dock"
): RepairPricing | null {
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  const devicePricing = repair.devices[deviceId];
  if (!devicePricing) {
    // Fallback to base price
    return {
      price: repair.basePrice,
      warranty: repairType === "battery" ? "24 months" : "12 months",
      time: "Up to 60 minutes",
    };
  }

  // Handle sub-types (camera, battery variants, back glass/housing)
  if (subType && typeof devicePricing === "object" && subType in devicePricing) {
    return (devicePricing as any)[subType];
  }

  // Return device-specific pricing
  if (typeof devicePricing === "object" && "price" in devicePricing) {
    return devicePricing as RepairPricing;
  }

  return null;
}

/**
 * Get repair description based on type
 */
export function getRepairDescription(repairType: string, deviceName: string, subType?: string): string {
  const descriptions: Record<string, string> = {
    screen: `Have you cracked or smashed your screen? Bring your ${deviceName} back to life with a shiny new replacement screen. Get that new phone feeling again!`,
    "back-cover": `Get your ${deviceName} back glass replaced, same day by our specialist technicians.`,
    "back-cover-glass": `Cracked or smashed back glass on your ${deviceName}? We’ll replace just the glass panel to make it look like new again.`,
    "back-cover-housing": `Severe damage to the back of your ${deviceName}? We’ll replace the full rear housing for a factory-fresh finish.`,
    battery: `Is your battery no longer lasting the day? Our highly-trained technicians can fix it with a brand new replacement!`,
    "battery-original": `Genuine‑quality premium battery replacement for your ${deviceName}, calibrated for maximum performance and longevity.`,
    "battery-regular": `High‑quality replacement battery for your ${deviceName}, a great value choice to keep you powered all day.`,
    "charging-port": `Is your device experiencing issues with charging, or your charging port has broken? We can fit a brand new one, to fix these problems!`,
    "charging-port-port": `Is your device experiencing issues with charging, or your charging port has broken? We can fit a brand new one, to fix these problems!`,
    "charging-port-dock": `Repair or replace charging dock and connectivity components to restore full charging functionality.`,
    "camera-front": `Is your device experiencing issues with the front camera? We can fit a brand new module, to get it working again!`,
    "camera-rear": `Is your device experiencing issues with the rear camera? We can fit a brand new module, to get it working again!`,
    "camera-lens": `Does your camera still work, but you've cracked or broken the glass? We can easily fit a brand new glass lens!`,
    "camera-replacement": `Full camera module replacement for front or rear camera issues. Professional repair service.`,
    earpiece: `Is your device experiencing issues with the earpiece? We can fit a brand new one, to fix these problems!`,
    "water-damage": `Has your ${deviceName} been exposed to water or liquid? Our expert technicians can diagnose and repair water damage to get your device working again.`,
  };

  const key = subType ? `${repairType}-${subType}` : repairType;
  return descriptions[key] || descriptions[repairType] || `Professional ${repairType} repair for your ${deviceName}.`;
}

/**
 * Get repair title based on type and device
 */
export function getRepairTitle(repairType: string, deviceName: string, subType?: string): string {
  const titles: Record<string, string> = {
    screen: `${deviceName} Screen Replacement`,
    "back-cover": `${deviceName} Back Glass & Housing`,
    "back-cover-glass": `${deviceName} Back Glass Replacement`,
    "back-cover-housing": `${deviceName} Back Glass & Housing Replacement`,
    battery: `${deviceName} Battery Replacement`,
    "battery-original": `${deviceName} Original Battery Replacement`,
    "battery-regular": `${deviceName} Standard Battery Replacement`,
    "charging-port": `${deviceName} Charging Port Repair`,
    "charging-port-port": `${deviceName} Charging Port Repair`,
    "charging-port-dock": `${deviceName} Charging Dock Repair`,
    "camera-front": `${deviceName} Front Camera Repair`,
    "camera-rear": `${deviceName} Rear Camera Repair`,
    "camera-lens": `${deviceName} Camera Lens Repair`,
    "camera-replacement": `${deviceName} Camera Replacement`,
    earpiece: `${deviceName} Earpiece Speaker`,
    "water-damage": `${deviceName} Water Damage Repair`,
  };

  // Handle special cases
  if (repairType === "battery" && subType === "original") {
    return titles["battery-original"] || `${deviceName} Original Battery Replacement`;
  }
  if (repairType === "battery" && subType === "regular") {
    return titles["battery-regular"] || `${deviceName} Standard Battery Replacement`;
  }
  if (repairType === "camera" && subType === "lens") {
    return titles["camera-lens"] || `${deviceName} Camera Lens Repair`;
  }
  if (repairType === "camera" && subType === "replacement") {
    return titles["camera-replacement"] || `${deviceName} Camera Replacement`;
  }
  if (repairType === "charging-port" && subType === "dock") {
    return titles["charging-port-dock"] || `${deviceName} Charging Dock Repair`;
  }

  const key = subType ? `${repairType}-${subType}` : repairType;
  return titles[key] || titles[repairType] || `${deviceName} ${repairType} Repair`;
}

/**
 * Get base price for a repair type (no device specified)
 */
export function getBaseRepairPrice(repairType: string): RepairPricing | null {
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  return {
    price: repair.basePrice,
    warranty: "12 months",
    time: "Up to 60 minutes",
  };
}

/**
 * Get price range for a repair type (min and max from all devices)
 */
export function getRepairPriceRange(repairType: string): { min: number; max: number; base: number } | null {
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  let min = repair.basePrice;
  let max = repair.basePrice;

  // Find min and max prices from all devices
  Object.values(repair.devices).forEach((devicePricing) => {
    if (typeof devicePricing === "object" && "price" in devicePricing) {
      const price = (devicePricing as RepairPricing).price;
      min = Math.min(min, price);
      max = Math.max(max, price);
    }
  });

  return {
    min,
    max,
    base: repair.basePrice,
  };
}

