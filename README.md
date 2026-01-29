# iCrack - Mobile Phone Repair Website

A modern, responsive website for iCrack mobile phone repair services, built with Next.js 14 and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with premium animations
- 📱 Mobile-first UX
- 🛒 Shopping cart functionality
- 🔍 Search functionality
- 📋 Multi-step booking flow
- 💳 Klarna payment integration (UI ready)
- 📧 Contact forms with email integration
- 🗺️ Store location and map integration
- 📱 Device selector for phones, tablets, and laptops
- 🔄 Refurbished phone catalog
- 📄 Comprehensive content pages (About, FAQ, Terms, Privacy, etc.)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── book/              # Booking flow pages
│   ├── repairs/           # Repair pages
│   ├── refurbished/       # Refurbished phones
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── repairs/          # Repair-related components
│   ├── home/             # Home page components
│   └── ...               # Other components
├── data/                 # JSON data files
│   ├── brands.json       # Device brands and models
│   ├── repairs.json      # Repair types
│   ├── pricing.json      # Pricing data
│   └── refurbished-iphones.json
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [https://icrackphonesandmacs.co.uk](https://icrackphonesandmacs.co.uk) in your browser (or http://localhost:3000 when running locally).

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory, ready for deployment to Cloudflare Pages or any static hosting service.

### Start Production Server

```bash
npm start
```

## Deployment

### Cloudflare Pages

The project is configured for static export and ready to deploy to Cloudflare Pages:

1. **Build Command**: `npm run build`
2. **Build Output Directory**: `out`
3. **Root Directory**: `/` (project root)

The build will generate static HTML files in the `out/` directory, which Cloudflare Pages will serve.

### Build Configuration

- Static export enabled (`output: 'export'` in `next.config.js`)
- Image optimization disabled for static export
- All dynamic routes have `generateStaticParams()` for static generation
- Trailing slashes enabled for better routing

## Configuration

### Contact Information

- **Email**: Phonesnmacs40@gmail.com
- **Phone**: 02081275250
- **Address**: 40a Notting Hill Gate, London W11 3HX

### Environment Variables

Currently, no environment variables are required. Email forms use `mailto:` links.

## Features in Detail

### Booking Flow

1. Select device brand
2. Select device model
3. Choose repair type
4. Select service type (Visit us / Mail-in / Call out)
5. Fill booking details
6. Confirmation page

### Shopping Cart

- Client-side cart using localStorage
- Email input for order updates
- Klarna payment option (UI ready)
- Supports both repairs and refurbished phones

### Search

- Full-text search across brands, models, and repair types
- Search results page with filtering

### Device Categories

- **Phones**: iPhone, Samsung, Google Pixel, etc.
- **Tablets**: iPad, Samsung Tab, etc.
- **Laptops**: MacBook, Dell, HP, Lenovo, etc.

## CI/CD

GitHub Actions workflow is configured (`.github/workflows/ci.yml`) to:
- Run linting
- Run type checking
- Build the project
- Validate the build

## License

Private project for iCrack.

## Contact

For questions or support, contact: Phonesnmacs40@gmail.com
