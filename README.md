# iCrack - Professional Mobile Phone Repair Website

A premium, fully responsive website for iCrack mobile phone repair services, built with Next.js 14, React, Tailwind CSS, and Framer Motion. This is a production-ready website with complete booking flows, shopping cart, and all supporting pages.

## 🚀 Features

### Core Functionality
- 🎨 **Modern, Premium Design** - Custom white and pink color palette with smooth animations
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 🚀 **Next.js 14 App Router** - Latest Next.js features with server components
- 🎯 **SEO-Optimized** - Meta tags, structured data, and semantic HTML
- 📊 **Device-First Booking Journey** - Intuitive step-by-step selection flow
- 🛒 **Shopping Cart** - Full cart functionality with Klarna integration
- 🔍 **Search Functionality** - Search across repairs, brands, and products

### Repair Services
- **Battery Replacement** - Original (premium) and Standard options with 24-month warranty
- **Screen Repair** - 12-month warranty for iPhone screens
- **Back Glass Repair** - Back glass only or full housing replacement options
- **Camera Repair** - Front, rear, and lens options
- **Water Damage Repair** - Expert restoration service
- **Charging Port Repair** - Fast charging port fixes
- **And More** - Comprehensive repair services for all device types

### Device Support
- 📱 **Phones** - iPhone, Samsung, Google Pixel, OnePlus, Xiaomi, Huawei, Oppo
- 📱 **Tablets** - iPad, Samsung Galaxy Tab, and more
- 💻 **Laptops** - MacBook, Dell, HP, Lenovo, and more

### Pages & Sections
- **Home** - Hero section, device categories, services, trust badges
- **Repairs** - Complete repair overview with categories
- **Device-Specific Pages** - iPhone, Samsung, Google repair pages
- **Repair Detail Pages** - Individual repair service pages with pricing
- **Booking Flow** - Multi-step booking (Brand → Device → Repair → Service → Details)
- **Refurbished Phones** - iPhone refurbished section with buy options
- **Accessories** - Device accessories (excluding cases/screen protectors)
- **Business** - Business services and partnerships
- **About** - About iCrack
- **Contact** - Contact form, map, and store information
- **FAQ** - Comprehensive FAQ section
- **Warranty** - Warranty information and terms
- **Terms & Privacy** - Legal pages
- **Student Discount** - 10% student discount information
- **Offers & Deals** - Current promotions
- **News & Blog** - Content pages
- **Delivery & Returns** - Shipping and return policy
- **Environment** - Environmental commitment
- **Sitemap** - Complete site structure

## 🛠 Tech Stack

- **Next.js 14.2.5** (App Router)
- **React 18.3.1**
- **TypeScript 5.5.4**
- **Tailwind CSS 3.4.7**
- **Framer Motion 11.3.19** (Animations)
- **Lucide React 0.427.0** (Icons)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pradeepannagarasu/icrack.git
cd icrack
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
iCrack/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── repairs/                 # Repair pages
│   │   ├── page.tsx             # Repairs overview
│   │   ├── [repair-type]/       # Individual repair pages
│   │   ├── iphone/              # iPhone-specific pages
│   │   ├── samsung/             # Samsung-specific pages
│   │   ├── google/              # Google Pixel pages
│   │   ├── phones/              # General phone repairs
│   │   ├── tablets/             # Tablet repairs
│   │   └── laptops/             # Laptop repairs
│   ├── book/                    # Booking flow
│   ├── refurbished/             # Refurbished phones
│   ├── cart/                    # Shopping cart
│   ├── contact/                 # Contact page
│   ├── about/                   # About page
│   ├── business/                # Business page
│   ├── faq/                     # FAQ page
│   └── ...                      # All other pages
├── components/                   # React components
│   ├── layout/                   # Header, Footer, Navigation
│   ├── home/                    # Home page components
│   ├── repairs/                 # Repair-related components
│   ├── booking/                 # Booking flow components
│   ├── cart/                    # Shopping cart components
│   ├── animations/              # Animation components
│   └── ui/                      # Reusable UI components
├── data/                        # JSON data files
│   ├── brands.json              # Device brands and models
│   ├── repairs.json             # Repair types and details
│   ├── pricing.json             # Pricing information
│   ├── locations.json           # Store locations
│   └── refurbished-iphones.json # Refurbished phone data
├── lib/                         # Utility functions
│   ├── pricing.ts               # Pricing calculations
│   ├── deviceImages.ts          # Image path utilities
│   ├── animations.ts            # Animation variants
│   ├── cart.ts                  # Cart utilities
│   └── categoryFilters.ts       # Device category filters
├── public/                      # Static assets
│   └── images/                  # Images and logos
├── types/                       # TypeScript type definitions
└── .github/workflows/           # CI/CD pipelines
```

## 🎨 Design System

### Colors
- **Primary**: Pink (#ec4899) - Main brand color
- **Accent**: Pink shades for highlights
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (body text)

### Spacing
- Custom spacing scale with larger border radii (xl, 2xl, 3xl)
- Mobile-optimized padding and margins

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Build for Production

```bash
npm run build
npm start
```

## 🧪 CI/CD

The project includes GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) that:

- ✅ Runs on Node.js 18.x and 20.x
- ✅ Installs dependencies
- ✅ Runs linter
- ✅ Builds the project
- ✅ Verifies build output
- ✅ Ready for deployment

The pipeline runs automatically on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## 📋 Key Features Implemented

### Booking System
- Multi-step booking flow (Brand → Device → Repair → Service → Details)
- Progress indicator
- Service selection (Visit Shop / Mail-in / Call-out)
- Booking confirmation page

### Shopping Cart
- Add repairs and refurbished phones to cart
- Quantity management
- Email collection for order updates
- Klarna payment integration (UI ready)

### Repair Options
- **Battery**: Original (premium) and Standard options
- **Back Glass**: Back glass only or full housing replacement
- **Camera**: Front, rear, or lens options
- Device-specific pricing

### Warranty System
- iPhone Screen: 12-month warranty
- iPhone Battery: 24-month warranty
- Other repairs: 12-month warranty

### Contact & Support
- Contact form with email integration
- Store location map (Google Maps embed)
- Phone: 02081275250
- Email: Phonesnmacs40@gmail.com
- Address: 40a Notting Hill Gate, London W11 3HX

## 🌐 Deployment

The project is ready for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting**

### Environment Variables

No environment variables required for basic functionality. For production, you may want to add:
- Email service API keys (for contact forms)
- Payment gateway keys (Stripe/SumUp/Klarna)
- Analytics keys

## 📝 License

Private project for iCrack brand.

## 👥 Contributing

This is a private project. For issues or feature requests, please contact the repository owner.

## 📞 Support

For support, email Phonesnmacs40@gmail.com or call 02081275250.

---

Built with ❤️ for iCrack
