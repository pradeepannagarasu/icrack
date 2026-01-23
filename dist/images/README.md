# Device Images

Place your transparent/no-background PNG device images here.

## Recommended Image Sources

For royalty-free, high-quality transparent device images:
- Remove.bg (remove backgrounds from device photos)
- Pexels (search "phone transparent" or "smartphone png")
- Unsplash (with background removal)
- Freepik (transparent device mockups)

## Image Naming Convention

Place images in `/public/images/devices/` folder with this naming:
- `{brand-id}-{model-id}.png` (e.g., `apple-iphone-15-pro.png`)
- `{brand-id}.png` for brand logos (e.g., `apple.png`, `samsung.png`)

Examples:
- `apple-iphone-15-pro.png`
- `samsung-galaxy-s24.png`
- `google-pixel-8.png`
- `apple.png` (for Apple brand logo)
- `samsung.png` (for Samsung brand logo)

## How to Update Images

1. **Add your images** to `/public/images/devices/` folder
2. **Update `lib/deviceImages.ts`** to use local images:

```typescript
export function getDeviceImage(brandId: string, modelId?: string): string {
  if (modelId) {
    return `/images/devices/${brandId}-${modelId}.png`;
  }
  return `/images/devices/${brandId}.png`;
}
```

## Current Implementation

The website uses a centralized image utility (`lib/deviceImages.ts`) that:
- Returns image URLs for brands and models
- Currently uses placeholder URLs (easily replaceable)
- All device images display on **white backgrounds** throughout the site

## Components Using Device Images

All these components now use device images with white backgrounds:
- `components/home/DeviceCategories.tsx` - Category images
- `components/home/DeviceSelector.tsx` - Brand and model selection
- `components/booking/steps/BrandStep.tsx` - Brand selection in booking flow
- `components/booking/steps/DeviceStep.tsx` - Model selection in booking flow
- `components/device-selector/steps/BrandStep.tsx` - Brand selection in device selector
- `components/device-selector/steps/ModelStep.tsx` - Model selection in device selector
- `components/repairs/DeviceRepairPage.tsx` - Device hero images
- `app/repairs/iphone/page.tsx` - iPhone model grid

## Image Requirements

- Format: PNG with transparency
- Resolution: 4K (3840x2160) or higher recommended
- Background: Transparent (will display on white background)
- File size: Optimized (under 500KB recommended)
- All images display on white backgrounds throughout the website

