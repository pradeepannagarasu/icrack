/**
 * Device Image Utility
 * 
 * Maps brand IDs and model IDs to local image files in /public/images/
 */

// Brand image mapping - maps brand ID to image filename
const brandImageMap: Record<string, string> = {
  apple: "mobile.png", // Using mobile.png for Apple (or add apple.jpg/png if available)
  samsung: "samsung.jpg",
  google: "Google .jpg", // Note: filename has a space - encode if needed
  huawei: "Huawei.jpg",
  oneplus: "OnePlus.jpg",
  oppo: "OPPO.jpg",
  xiaomi: "Xiaomi.jpg",
  other: "Other.jpg",
};

// Category images
export const categoryImages = {
  phones: "/images/mobile.png",
  tablets: "/images/tablet.jpg",
  laptops: "/images/laptop.jpg",
};

// Repair type images mapping
// Maps to actual image files in /public/images/repairs/
const repairImageMap: Record<string, string> = {
  screen: "/images/repairs/Screen Replacement.jpg", // Screen repair
  battery: "/images/repairs/Battery replacement.jpg", // Battery repair
  camera: "/images/repairs/Camera repair.jpg", // Camera repair
  "charging-port": "/images/repairs/Charging port repair.jpg", // Charging port
  "water-damage": "/images/repairs/water reapir.jpg", // Water damage (note: typo in filename)
  diagnostics: "/images/repairs/Diagnostics repai.jpg", // Diagnostics (note: typo in filename)
  speaker: "/images/repairs/speaker repai.jpg", // Speaker repair (note: typo in filename)
  software: "/images/repairs/software issues.jpg", // Software issues
  "back-glass": "/images/repairs/Cell phone repair.jpg", // Back glass repair - using general repair image
  earpiece: "/images/repairs/speaker repai.jpg", // Earpiece repair - using speaker image
  "home-button": "/images/repairs/Cell phone repair.jpg", // Home button repair - using general repair image
  "back-cover": "/images/repairs/Cell phone repair.jpg", // Back cover repair - using general repair image
};

// Fallback to mobile.png if repair-specific image doesn't exist
const repairImageFallback = "/images/mobile.png";

/**
 * Get brand image URL
 */
export function getBrandImage(brandId: string): string {
  const imageFile = brandImageMap[brandId.toLowerCase()] || brandImageMap.other;
  // Handle filenames with spaces by encoding
  const encodedFile = imageFile.includes(" ") ? encodeURIComponent(imageFile) : imageFile;
  return `/images/${encodedFile}`;
}

/**
 * Get model-specific device image
 *
 * Phones  -> use brand image / phone imagery
 * Tablets -> use generic tablet image
 * Laptops -> use generic laptop image
 */
export function getModelImage(brandId: string, modelId: string): string {
  const id = modelId.toLowerCase();

  // Tablets
  if (id.includes("ipad") || id.includes("tab")) {
    return categoryImages.tablets;
  }

  // Laptops
  if (
    id.includes("macbook") ||
    id.includes("mac") ||
    id.includes("xps") ||
    id.includes("spectre") ||
    id.includes("thinkpad") ||
    id.includes("yoga") ||
    id.includes("inspiron") ||
    id.includes("envy") ||
    id.includes("pavilion") ||
    id.includes("elitebook") ||
    id.includes("ideapad") ||
    id.includes("latitude")
  ) {
    return categoryImages.laptops;
  }

  // Phones and everything else fall back to brand image / phone photo
  return getBrandImage(brandId);
}

/**
 * Get device image (brand or model)
 */
export function getDeviceImage(brandId: string, modelId?: string): string {
  if (modelId) {
    return getModelImage(brandId, modelId);
  }
  return getBrandImage(brandId);
}

/**
 * Get repair type image
 * Falls back to mobile.png if specific repair image doesn't exist
 */
export function getRepairImage(repairTypeId: string): string {
  const imagePath = repairImageMap[repairTypeId] || repairImageFallback;
  // Handle filenames with spaces by encoding the path
  // Split the path and encode only the filename part
  if (imagePath.includes(' ')) {
    const parts = imagePath.split('/');
    const filename = parts[parts.length - 1];
    const encodedFilename = encodeURIComponent(filename);
    return parts.slice(0, -1).join('/') + '/' + encodedFilename;
  }
  return imagePath;
}

/**
 * Check if repair image exists (for conditional rendering)
 * For now, always returns false since we're using fallback
 */
export function repairImageExists(repairTypeId: string): boolean {
  // Return false to always show fallback for now
  // When images are added, this can check if image file exists
  return false;
}
