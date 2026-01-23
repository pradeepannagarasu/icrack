/**
 * Category Filter Utility
 * 
 * Filters brands and models by device category (phones, tablets, laptops)
 */

import brandsData from "@/data/brands.json";
import { Brand, Model } from "@/types";

export type DeviceCategory = "phones" | "tablets" | "laptops";

/**
 * Check if a model ID belongs to a specific category
 */
export function isModelInCategory(modelId: string, category: DeviceCategory): boolean {
  const lowerId = modelId.toLowerCase();
  
  if (category === "tablets") {
    return lowerId.includes("ipad") || lowerId.includes("tab");
  }
  
  if (category === "laptops") {
    return (
      lowerId.includes("macbook") ||
      lowerId.includes("mac") ||
      lowerId.includes("xps") ||
      lowerId.includes("spectre") ||
      lowerId.includes("thinkpad") ||
      lowerId.includes("yoga") ||
      lowerId.includes("inspiron") ||
      lowerId.includes("envy") ||
      lowerId.includes("pavilion") ||
      lowerId.includes("elitebook") ||
      lowerId.includes("ideapad") ||
      lowerId.includes("latitude")
    );
  }
  
  // Phones - default category (not tablets or laptops)
  return !lowerId.includes("ipad") && !lowerId.includes("tab") &&
         !lowerId.includes("macbook") && !lowerId.includes("mac") &&
         !lowerId.includes("xps") && !lowerId.includes("spectre") &&
         !lowerId.includes("thinkpad") && !lowerId.includes("yoga") &&
         !lowerId.includes("inspiron") && !lowerId.includes("envy") &&
         !lowerId.includes("pavilion") && !lowerId.includes("elitebook") &&
         !lowerId.includes("ideapad") && !lowerId.includes("latitude");
}

/**
 * Filter brands to only include those that have models in the specified category
 */
export function getBrandsByCategory(category: DeviceCategory): Brand[] {
  const allBrands = brandsData.brands as Brand[];
  
  return allBrands
    .map((brand) => {
      const filteredModels = brand.models.filter((model) =>
        isModelInCategory(model.id, category)
      );
      
      if (filteredModels.length === 0) {
        return null;
      }
      
      return {
        ...brand,
        models: filteredModels,
      };
    })
    .filter((brand): brand is Brand => brand !== null);
}

/**
 * Filter models for a specific brand by category
 */
export function getModelsByCategory(brandId: string, category: DeviceCategory): Model[] {
  const brand = brandsData.brands.find((b) => b.id === brandId);
  if (!brand) return [];
  
  return brand.models.filter((model) => isModelInCategory(model.id, category));
}

/**
 * Get all brands that support a category (has at least one model in that category)
 */
export function getBrandIdsByCategory(category: DeviceCategory): string[] {
  const filteredBrands = getBrandsByCategory(category);
  return filteredBrands.map((brand) => brand.id);
}

