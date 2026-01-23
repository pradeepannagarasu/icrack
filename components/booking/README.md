# Booking Flow Components

This directory contains the multi-step device selection and booking flow, matching the iSmash.com structure.

## Architecture

### Main Component
- **`BookingFlow.tsx`** - Main orchestrator component that manages state and step transitions

### Step Components
- **`steps/BrandStep.tsx`** - Step 1: Brand selection
- **`steps/DeviceStep.tsx`** - Step 2: Device model selection
- **`steps/RepairTypeStep.tsx`** - Step 3: Repair type selection
- **`steps/BookingFormStep.tsx`** - Step 4: Customer information form

### UI Components
- **`ProgressIndicator.tsx`** - Visual progress bar showing current step and completed steps

## State Management

The `BookingFlow` component manages all state using React hooks:

```typescript
- selectedBrand: Brand | null
- selectedModel: Model | null
- selectedRepair: RepairType | null
- bookingData: Partial<BookingData>
- currentStep: BookingStep
```

## Flow Logic

1. **Brand Selection** → Sets `selectedBrand`, moves to "device" step
2. **Device Selection** → Sets `selectedModel`, moves to "repair" step
3. **Repair Selection** → Sets `selectedRepair`, moves to "form" step
4. **Form Submission** → Calls `onComplete` callback with full booking data

## Animations

All step transitions use Framer Motion:
- **Slide animations**: Steps slide in from right, exit to left
- **Stagger animations**: Grid items animate with delay
- **Hover effects**: Scale and translate on interactive elements
- **Progress indicator**: Smooth transitions between steps

## Mobile-First Design

- Responsive grid layouts (2 cols mobile, 3-4 cols desktop)
- Touch-friendly button sizes
- Simplified progress indicator on mobile
- Full-width form inputs

## Usage

```tsx
import BookingFlow from "@/components/booking/BookingFlow";

<BookingFlow
  initialStep="brand"
  onComplete={(data) => {
    // Handle booking completion
    console.log(data);
  }}
/>
```

## Data Requirements

The flow expects:
- `data/brands.json` - Brand and model data
- `data/repairs.json` - Repair type definitions
- TypeScript types defined in `types/index.ts`

## Customization

### Adding New Steps
1. Add step ID to `BookingStep` type
2. Add step component in `BookingFlow`
3. Update `ProgressIndicator` steps array
4. Add state management logic

### Styling
All components use Tailwind CSS with the custom design system:
- Primary colors: `primary-*`
- Accent colors: `accent-*`
- Neutral colors: `neutral-*`
- Border radius: `rounded-xl`, `rounded-2xl`, `rounded-3xl`

