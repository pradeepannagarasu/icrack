# iCrack - Professional Mobile Phone Repair Website

A premium, fully responsive website for iCrack mobile phone repair services, built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern, premium design with custom color palette
- 📱 Fully responsive across all devices
- ✨ Smooth animations and micro-interactions
- 🚀 Next.js 14 App Router
- 🎯 SEO-optimized
- 📊 Device-first booking journey
- 🔄 Step-by-step animated selection flow

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (Icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
iCrack/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky animated header
│   │   └── Footer.tsx      # Footer with links
│   └── home/
│       ├── DeviceSelector.tsx
│       ├── ServiceCard.tsx
│       └── TrustBadge.tsx
├── data/
│   ├── brands.json         # Device brands and models
│   └── repairs.json        # Repair types and details
└── public/                 # Static assets
```

## Pages

- **Home** - Hero, device selector, services, trust badges, CTA
- **Repairs** - Overview of all repair services
- **Device Selector** - Brand → Model → Repair flow
- **Repair Detail** - Individual repair service pages
- **Accessories** - Phone accessories
- **Business** - Business/partner services
- **About** - About iCrack
- **Contact** - Contact information and form
- **Booking** - Repair booking flow
- **FAQ** - Frequently asked questions
- **Locations** - Store locations

## Design System

### Colors
- **Primary**: Blue tones (#0ea5e9)
- **Accent**: Red tones (#ef4444)
- **Neutral**: Gray scale

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (body text)

### Spacing
- Custom spacing scale with larger border radii (xl, 2xl, 3xl)

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## License

Private project for iCrack brand.

