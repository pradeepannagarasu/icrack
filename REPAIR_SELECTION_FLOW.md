# Repair Selection Flow Documentation

## Overview
Complete repair selection flow matching iSmash.com design, with detailed repair cards and service selection.

## Flow Structure

### 1. Device Selection Page (`/repairs/iphone/[model]`)
- User selects a device model
- Shows progress indicator: Step 1 (Device) completed, Step 2 (Repair) active

### 2. Repair Type Selection
- User sees 9 repair options:
  - Front screen
  - Back cover
  - Inner screen
  - Outer screen
  - Battery & charging
  - Camera (front or rear) - shows sub-options
  - Liquid damage
  - Other repairs
  - I don't know

### 3. Repair Detail Card (Shown when repair is selected)
- Large pink-bordered card with:
  - Repair icon/image
  - Title (e.g., "iPhone 8 Screen Replacement")
  - Price (e.g., "£79")
  - "SAVE £X VS Apple" banner (if applicable)
  - Color/variant dropdown (if applicable)
  - Description
  - Warranty information
  - Repair time
  - "Book Repair" button

### 4. Service Selection Page (`/book/service`)
- Shows "How do you want us to fix your device?"
- Two options:
  - **Visit us**: Choose from 38 nationwide locations
  - **Mail-in**: Send your device to us
- Progress indicator showing step 1 completed

### 5. Booking Flow Continuation
- After service selection, continues to store selection (if Visit us) or mail-in form

## Components

### `RepairDetailCard.tsx`
- Displays detailed repair information
- Handles variant/color selection
- Navigates to service selection on "Book Repair" click

### `DeviceRepairPage.tsx`
- Main page showing repair options
- Handles repair selection state
- Shows repair detail card when option is selected
- Handles camera sub-options (front/rear/lens)

### `ServiceSelectionContent.tsx`
- Service selection page
- Two-card layout for Visit us / Mail-in
- Progress indicator
- Back navigation

## Data Structure

### `data/pricing.json`
- Contains pricing for all repairs
- Device-specific pricing
- Variants/colors for applicable repairs
- Warranty and repair time information

### `lib/pricing.ts`
- Utility functions to get pricing data
- `getRepairPricing()` - Get price, warranty, time for repair
- `getRepairTitle()` - Get formatted repair title
- `getRepairDescription()` - Get repair description

## Supported Devices
- iPhone 8, SE, 7, 15 Pro, 15, 14 Pro, 14, 13 Pro, 13, 12, 11
- More devices can be added to `pricing.json`

## Supported Repairs
- Screen Replacement
- Back Cover/Housing
- Battery Replacement
- Charging Port/Dock
- Camera (Front/Rear/Lens)
- Earpiece Speaker
- Water Damage
- Other repairs

## Next Steps
1. Add more device models to pricing.json
2. Add Samsung, Google, and other brand devices
3. Integrate with store selection
4. Add mail-in form
5. Complete booking flow

