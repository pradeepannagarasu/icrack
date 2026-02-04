/**
 * Pricing Utility
 * Gets pricing information for repairs based on device and repair type
 * Checks localStorage first for admin updates, then falls back to JSON file
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

/**
 * Get pricing data - checks localStorage first, then falls back to JSON file
 * This function is called dynamically to always get the latest pricing
 */
function getPricingData(): PricingData {
  // Check if pricing is stored in localStorage (from admin updates)
  if (typeof window !== "undefined") {
    const savedPricing = localStorage.getItem("icrack_pricing");
    if (savedPricing) {
      try {
        return JSON.parse(savedPricing) as PricingData;
      } catch (e) {
        console.error("Error parsing saved pricing:", e);
      }
    }
  }
  
  // Fallback to default pricing from JSON file
  return pricingData as PricingData;
}

/**
 * Check if a device has explicit pricing configured for a repair type.
 * Used by the UI to hide repair options that don't exist for a given model.
 */
export function deviceHasRepair(deviceId: string, repairType: string): boolean {
  const data = pricingData as PricingData;
  const repair = data.repairs?.[repairType];
  if (!repair || !repair.devices) return false;
  return repair.devices[deviceId] != null;
}

/**
 * Get which explicit screen variants (original/regular/inner/outer)
 * exist for a given device in the static pricing JSON.
 * Used by the UI to decide whether to show one or multiple screen options.
 */
export function getScreenVariantKeys(
  deviceId: string
): Array<"original" | "regular" | "inner" | "outer"> {
  const data = pricingData as PricingData;
  const screenRepair = data.repairs?.["screen"];
  const devicePricing = screenRepair?.devices?.[deviceId] as
    | RepairPricing
    | {
        front?: RepairPricing;
        rear?: RepairPricing;
        lens?: RepairPricing;
        original?: RepairPricing;
        regular?: RepairPricing;
        glass?: RepairPricing;
        housing?: RepairPricing;
        inner?: RepairPricing;
        outer?: RepairPricing;
      }
    | undefined;

  const keys: Array<"original" | "regular" | "inner" | "outer"> = [];
  if (!devicePricing || typeof devicePricing !== "object" || "price" in devicePricing) {
    // Flat price – no explicit variants
    return keys;
  }

  (["original", "regular", "inner", "outer"] as const).forEach((key) => {
    if ((devicePricing as any)[key]) {
      keys.push(key);
    }
  });

  return keys;
}

/**
 * Get pricing for a specific repair
 */
export function getRepairPricing(
  deviceId: string,
  repairType: string,
  subType?: "front" | "rear" | "lens" | "replacement" | "original" | "regular" | "glass" | "housing" | "port" | "dock" | "inner" | "outer"
): RepairPricing | null {
  const pricing = getPricingData();
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  // Samsung & all iPhones: always use default JSON pricing so each model shows its repair prices and localStorage never overrides
  const defaultData = pricingData as PricingData;
  const defaultRepair = defaultData.repairs?.[repairType];
  const defaultDevice = defaultRepair?.devices?.[deviceId];
  const useDefaultPricing =
    (deviceId.startsWith("galaxy-") || deviceId.startsWith("iphone-") || deviceId.startsWith("pixel-")) && defaultDevice != null;

  const devicePricing = useDefaultPricing ? defaultDevice : repair.devices[deviceId];
  if (!devicePricing) {
    // Fallback to base price
    if (repairType === "diagnostics") {
      return {
        price: repair.basePrice,
        warranty: "N/A",
        time: "Up to 30 minutes",
      };
    }
    if (repairType === "software") {
      return {
        price: repair.basePrice,
        warranty: "3 months",
        time: "60 - 120 mins",
      };
    }
    return {
      price: repair.basePrice,
      warranty: repairType === "battery" ? "24 months" : "12 months",
      time: "Up to 60 minutes",
    };
  }

  // Handle sub-types (camera, battery variants, back glass/housing, screen original/regular)
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
  const bookingNote = " Please ensure you book online prior to arriving, so we can make sure your required part is on site and ready for your repair. Note: this time is an estimate, and may vary slightly depending on location.";
  const descriptions: Record<string, string> = {
    screen: `Have you cracked or smashed your screen? Bring your ${deviceName} back to life with a shiny new replacement screen. Get that new phone feeling again!`,
    "screen-original": `An Original Apple screen, refurbished with new, pristine glass.${bookingNote}`,
    "screen-regular": `Our LCD screen is a great option for most customers, providing excellent colour accuracy, brightness & responsiveness. Most customers won't notice a huge difference compared to our Original Refurbished Screen.${bookingNote}`,
    "screen-inner": `Our Samsung-Accredited Technicians will replace your cracked or smashed screen with a brand new, Genuine Samsung Screen Replacement. Plus, you'll get a FREE GENUINE SAMSUNG BATTERY REPLACEMENT included!`,
    "screen-outer": `Our Samsung-Accredited Technicians will replace your cracked or smashed screen with a brand new, Genuine Samsung Screen Replacement.`,
    "back-cover": `Get your ${deviceName} back glass replaced, same day by our specialist technicians.`,
    "back-cover-glass": `Cracked or smashed back glass on your ${deviceName}? We’ll replace just the glass panel to make it look like new again.`,
    "back-cover-housing": `Severe damage to the back of your ${deviceName}? We’ll replace the full rear housing for a factory-fresh finish.`,
    battery: `Is your battery no longer lasting the day? Our highly-trained technicians can fix it with a brand new replacement!`,
    "battery-original": `Is your battery no longer lasting the day? Our highly-trained technicians can fix it with a brand new replacement!`,
    "battery-regular": `Is your battery no longer lasting the day? Our highly-trained technicians can fix it with a brand new replacement!`,
    "charging-port": `Is your device experiencing issues with charging, or your charging port has broken? We can fit a brand new one, to fix these problems!`,
    "charging-port-port": `Is your device experiencing issues with charging, or your charging port has broken? We can fit a brand new one, to fix these problems!`,
    "charging-port-dock": `Repair or replace charging dock and connectivity components to restore full charging functionality.`,
    "camera-front": `Is your device experiencing issues with the front camera? We can fit a brand new module, to get it working again!`,
    "camera-rear": `Is your device experiencing issues with the rear camera? We can fit a brand new module, to get it working again!`,
    "camera-lens": `Does your camera still work, but you've cracked or broken the glass? We can easily fit a brand new glass lens!`,
    "camera-replacement": `Full camera module replacement for front or rear camera issues. Professional repair service.`,
    earpiece: `Is your device experiencing issues with the earpiece? We can fit a brand new one, to fix these problems!`,
    "water-damage": `Has your ${deviceName} been exposed to water or liquid? Our expert technicians can diagnose and repair water damage to get your device working again.`,
    software: `Resolve software problems, updates, and system errors. Expert troubleshooting for your ${deviceName}.`,
    diagnostics: `Comprehensive device diagnostics. Identify issues and get repair recommendations.`,
  };

  // Use subtype for screen so Original vs Non-Original get their specific descriptions
  const key =
    repairType === "screen" && subType
      ? `${repairType}-${subType}`
      : repairType === "battery"
        ? repairType
        : subType
          ? `${repairType}-${subType}`
          : repairType;
  return descriptions[key] || descriptions[repairType] || `Professional ${repairType} repair for your ${deviceName}.`;
}

/**
 * Get repair title based on type and device
 */
export function getRepairTitle(repairType: string, deviceName: string, subType?: string): string {
  const titles: Record<string, string> = {
    screen: `${deviceName} Screen Replacement`,
    "screen-original": `${deviceName} Original Screen`,
    "screen-regular": `${deviceName} Non-Original Screen`,
    "back-cover": `${deviceName} Back Glass & Housing`,
    "back-cover-glass": `${deviceName} Back Glass Replacement`,
    "back-cover-housing": `${deviceName} Back Glass & Housing Replacement`,
    battery: `${deviceName} Battery Replacement`,
    "battery-original": `${deviceName} Battery Replacement`,
    "battery-regular": `${deviceName} Battery Replacement`,
    "charging-port": `${deviceName} Charging Port Repair`,
    "charging-port-port": `${deviceName} Charging Port Repair`,
    "charging-port-dock": `${deviceName} Charging Dock Repair`,
    "camera-front": `${deviceName} Front Camera Repair`,
    "camera-rear": `${deviceName} Rear Camera Repair`,
    "camera-lens": `${deviceName} Camera Lens Repair`,
    "camera-replacement": `${deviceName} Camera Replacement`,
    earpiece: `${deviceName} Earpiece Speaker`,
    "water-damage": `${deviceName} Water Damage Repair`,
    diagnostics: `Diagnostics`,
    software: `Software Issues`,
  };

  // Handle special cases
  if (repairType === "screen" && subType === "inner") {
    return `${deviceName} Inner Screen Replacement`;
  }
  if (repairType === "screen" && subType === "outer") {
    return `${deviceName} Outer Screen Replacement`;
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

  // Use subtype for screen so Original vs Non-Original show correct titles
  const key =
    repairType === "screen" && subType
      ? `${repairType}-${subType}`
      : repairType === "battery"
        ? repairType
        : subType
          ? `${repairType}-${subType}`
          : repairType;
  return titles[key] || titles[repairType] || `${deviceName} ${repairType} Repair`;
}

/**
 * Get base price for a repair type (no device specified)
 */
export function getBaseRepairPrice(repairType: string): RepairPricing | null {
  const pricing = getPricingData();
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  if (repairType === "diagnostics") {
    return {
      price: repair.basePrice,
      warranty: "N/A",
      time: "Up to 30 minutes",
    };
  }
  if (repairType === "software") {
    return {
      price: repair.basePrice,
      warranty: "3 months",
      time: "60 - 120 mins",
    };
  }

  return {
    price: repair.basePrice,
    warranty: "12 months",
    time: "Up to 60 minutes",
  };
}

/** Collect all numeric prices from a device entry (flat or nested original/regular/glass/housing/front/rear/lens) */
function collectPrices(devicePricing: unknown): number[] {
  const prices: number[] = [];
  if (!devicePricing || typeof devicePricing !== "object") return prices;
  const obj = devicePricing as Record<string, unknown>;
  if (typeof (obj as any).price === "number") {
    prices.push((obj as any).price);
  }
  for (const key of ["original", "regular", "glass", "housing", "front", "rear", "lens"]) {
    const nested = obj[key];
    if (nested && typeof nested === "object" && typeof (nested as any).price === "number") {
      prices.push((nested as any).price);
    }
  }
  return prices;
}

/**
 * Get price range for a repair type (min and max from all devices)
 * Includes nested pricing (e.g. battery original/regular, back-cover glass/housing, camera front/rear/lens)
 */
export function getRepairPriceRange(repairType: string): { min: number; max: number; base: number } | null {
  const pricing = getPricingData();
  const repair = pricing.repairs[repairType];
  if (!repair) return null;

  let min = repair.basePrice;
  let max = repair.basePrice;

  Object.values(repair.devices).forEach((devicePricing) => {
    collectPrices(devicePricing).forEach((price) => {
      min = Math.min(min, price);
      max = Math.max(max, price);
    });
  });

  return {
    min,
    max,
    base: repair.basePrice,
  };
}

