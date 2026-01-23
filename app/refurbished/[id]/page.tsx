"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Mail, CreditCard, ShoppingCart } from "lucide-react";
import { refurbishedIphones } from "@/lib/refurbished";
import BackLink from "@/components/ui/BackLink";
import { useCart } from "@/components/cart/CartContext";
import { motion } from "framer-motion";

export default function RefurbishedDetailPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { addToCart } = useCart();

  const phone = refurbishedIphones.find((p) => p.id === params.id);
  if (!phone) {
    notFound();
  }

  const [selectedStorage, setSelectedStorage] = useState(phone.storageOptions[0] || "");
  const [selectedColor, setSelectedColor] = useState(phone.colours[0] || "");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: phone.id,
      type: "refurbished",
      name: `${phone.name} - ${selectedStorage} - ${selectedColor}`,
      price: phone.basePrice,
      image: "/images/mobile.png",
      details: {
        storage: selectedStorage,
        color: selectedColor,
      },
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-20 lg:pt-[176px] pb-16 bg-neutral-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-3">
          <BackLink href="/refurbished" label="Back to refurbished phones" />
        </div>
        {/* Breadcrumbs */}
        <div className="text-xs text-neutral-500 mb-4">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/refurbished" className="hover:text-primary-600">
            Refurbished iPhones
          </Link>{" "}
          / <span className="text-neutral-700">{phone.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Image & basic info */}
          <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 flex flex-col items-center">
            <div className="w-48 h-48 bg-neutral-50 rounded-2xl flex items-center justify-center overflow-hidden mb-6">
              <Image
                src="/images/mobile.png"
                alt={phone.name}
                width={192}
                height={192}
                className="object-contain w-full h-full p-4"
              />
            </div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2 text-center">
              {phone.name}
            </h1>
            <p className="text-primary-600 text-2xl font-bold mb-1">From £{phone.basePrice}</p>
            <p className="text-sm text-neutral-500">
              {phone.condition} condition • 12-month warranty • 30-point quality check
            </p>
          </div>

          {/* Right: configuration & purchase options */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Choose storage</h2>
              <div className="flex flex-wrap gap-2">
                {phone.storageOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(s)}
                    className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      selectedStorage === s
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-primary-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Choose colour</h2>
              <div className="flex flex-wrap gap-2">
                {phone.colours.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedColor === c
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{addedToCart ? "Added to Cart!" : "Add to Cart"}</span>
            </motion.button>

            {/* How do you want to buy? */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">
                How do you want to buy this device?
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <Link
                  href={`/contact?type=visit-store&product=refurbished&id=${phone.id}`}
                  className="flex items-start gap-3 rounded-2xl border-2 border-primary-200 bg-white p-4 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Visit shop / collect in-store</p>
                    <p className="text-xs text-neutral-600">
                      Reserve this iPhone and collect at your nearest iCrack location.
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/contact?type=mail-order&product=refurbished&id=${phone.id}`}
                  className="flex items-start gap-3 rounded-2xl border-2 border-primary-200 bg-white p-4 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Mail order / delivery</p>
                    <p className="text-xs text-neutral-600">
                      Enquire to have this device shipped securely to your address.
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/contact?type=order&product=refurbished&id=${phone.id}`}
                  className="flex items-start gap-3 rounded-2xl border-2 border-primary-600 bg-primary-50 p-4 hover:border-primary-700 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Place Order with Contact Form</p>
                    <p className="text-xs text-neutral-600">
                      Fill out our contact form with your details and we'll process your order.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Klarna Payment Info */}
            <div className="rounded-2xl border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-accent-50 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Pay with Klarna</p>
                <p className="text-xs text-neutral-700 mb-1">
                  Add to cart to pay with Klarna - split your payment into 3 interest-free instalments.
                </p>
                <p className="text-xs text-neutral-500">
                  Subject to status. T&Cs apply. Available when you add to cart and checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


