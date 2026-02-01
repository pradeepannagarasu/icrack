import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTABar from "@/components/layout/MobileCTABar";
import PageTransition from "@/components/animations/PageTransition";
import ScrollRestoration from "@/components/layout/ScrollRestoration";
import { CartProvider } from "@/components/cart/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "iCrack - Professional Mobile Phone Repairs",
  description: "Expert mobile phone repair services. Fast, reliable, and affordable repairs for all major brands.",
  keywords: "phone repair, mobile repair, screen repair, iPhone repair, Samsung repair",
  icons: {
    icon: "/images/icrack_logo.png",
    shortcut: "/images/icrack_logo.png",
    apple: "/images/icrack_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ScrollRestoration />
        <CartProvider>
          <Header />
          <PageTransition>
            <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
          </PageTransition>
          <Footer />
          <MobileCTABar />
        </CartProvider>
      </body>
    </html>
  );
}

