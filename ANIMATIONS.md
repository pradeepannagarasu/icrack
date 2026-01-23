# Premium Animations Documentation

This document outlines all the premium animations implemented in the iCrack website.

## Animation Features

### 1. Navbar Hide/Show on Scroll
**Location:** `components/layout/Header.tsx`

- **Behavior:** Navbar automatically hides when scrolling down and shows when scrolling up
- **Implementation:** Uses scroll position tracking with smooth Framer Motion animations
- **Threshold:** Hides after scrolling 100px down
- **Animation:** Smooth slide up/down with 0.3s duration and custom easing

### 2. Hero Entrance Animation
**Location:** `app/page.tsx` (Hero Section)

- **Features:**
  - Staggered text animation (title, subtitle, buttons)
  - Gradient text reveal with scale animation
  - Smooth fade-in-up effect
  - Custom easing curve for premium feel: `[0.25, 0.46, 0.45, 0.94]`
- **Duration:** 0.8s with staggered children (0.15s delay between elements)
- **Variants:** Uses `heroVariants` and `fadeInUp` from animation library

### 3. Card Hover Elevation
**Location:** 
- `components/home/ServiceCard.tsx`
- `components/home/TrustBadge.tsx`
- `components/home/DeviceSelector.tsx`

- **Effects:**
  - **Scale:** Cards scale to 1.02 on hover
  - **Elevation:** Cards lift up by 8px with enhanced shadow
  - **Icon Animation:** Icons scale to 1.1 and rotate 5° on hover
  - **Shadow Enhancement:** Dynamic shadow elevation from `shadow-lg` to `shadow-xl`
- **Easing:** Custom premium easing curve
- **Duration:** 0.3s for smooth transitions

### 4. Scroll Reveal Animations
**Location:** `components/animations/ScrollReveal.tsx`

- **Features:**
  - Elements fade in and slide up when entering viewport
  - Once-triggered (animates only once)
  - Configurable delay for staggered effects
  - Support for multiple directions (up, down, left, right)
- **Threshold:** 100px margin before triggering
- **Applied to:**
  - Section headings
  - Service cards
  - Trust badges
  - Device selector
  - CTA sections

### 5. Page Transitions
**Location:** `components/animations/PageTransition.tsx`

- **Behavior:** Smooth fade and slide transitions between routes
- **Animation:**
  - **Initial:** Fade in from 0 opacity, slide up 20px
  - **Exit:** Fade out, slide down 20px
- **Duration:** 0.4s entrance, 0.3s exit
- **Implementation:** Wraps main content in root layout

## Animation Utilities

### Animation Library
**Location:** `lib/animations.ts`

Contains reusable animation variants:

1. **scrollRevealVariants** - Scroll-triggered reveal animations
2. **staggerContainer** - Container for staggered children animations
3. **fadeInUp** - Fade in with upward motion
4. **scaleIn** - Scale in animation
5. **heroVariants** - Hero section entrance animations
6. **pageTransition** - Page transition variants
7. **cardHover** - Card hover elevation effects
8. **navbarVariants** - Navbar show/hide animations

### Custom Easing
All animations use a custom easing curve: `[0.25, 0.46, 0.45, 0.94]`
This creates a smooth, premium feel similar to Apple's animations.

## Component Animations

### ScrollReveal Component
```tsx
<ScrollReveal delay={0.2} direction="up">
  {children}
</ScrollReveal>
```

**Props:**
- `delay`: Animation delay in seconds
- `direction`: Animation direction (up, down, left, right)
- `className`: Additional CSS classes

### CardHover Component
```tsx
<CardHover className="...">
  {children}
</CardHover>
```

Wraps content with premium hover elevation effects.

### PageTransition Component
Automatically wraps main content in root layout for route transitions.

## Performance Considerations

1. **Once-triggered animations:** Scroll reveals only animate once to prevent re-triggering
2. **Passive scroll listeners:** Uses passive event listeners for better performance
3. **GPU acceleration:** Transform and opacity properties for smooth 60fps animations
4. **Viewport detection:** Uses Intersection Observer API via Framer Motion's `useInView`

## Animation Timing

- **Fast interactions:** 0.2-0.3s (hover, tap)
- **Medium transitions:** 0.4-0.6s (page transitions, scroll reveals)
- **Hero entrance:** 0.8s (initial page load)
- **Stagger delays:** 0.1-0.15s between elements

## Browser Support

All animations use Framer Motion, which provides:
- Automatic fallbacks for reduced motion preferences
- Cross-browser compatibility
- Hardware acceleration
- Smooth 60fps animations

## Accessibility

- Respects `prefers-reduced-motion` media query
- Animations don't interfere with keyboard navigation
- Focus states remain visible during animations

