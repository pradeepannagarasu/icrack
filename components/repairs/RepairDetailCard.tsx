"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getRepairImage } from "@/lib/deviceImages";
import { useCart } from "@/components/cart/CartContext";

interface RepairDetailCardProps {
  repairId: string;
  title: string;
  price: number;
  saveAmount?: number;
  description: string;
  warranty: string;
  repairTime: string;
  variants?: string[];
  deviceId: string;
  brandId: string;
  image?: string;
}

export default function RepairDetailCard({
  repairId,
  title,
  price,
  saveAmount,
  description,
  warranty,
  repairTime,
  variants = [],
  deviceId,
  brandId,
  image,
}: RepairDetailCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || "");
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBookRepair = () => {
    // Navigate to service selection page
    const params = new URLSearchParams({
      brand: brandId,
      device: deviceId,
      repair: repairId,
      ...(selectedVariant && { variant: selectedVariant }),
    });
    window.location.href = `/book/service?${params.toString()}`;
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${repairId}-${deviceId}`,
      type: "repair",
      name: title,
      price: price,
      image: image || getRepairImage(repairId),
      details: {
        brand: brandId,
        device: deviceId,
        repairType: repairId,
        variant: selectedVariant || undefined,
      },
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border-4 border-primary-500 p-6 md:p-8 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column - Icon, Title, Price, CTA */}
        <div className="flex flex-col">
          {/* Save Banner */}
          {saveAmount && (
            <div className="mb-4 relative">
              <div className="bg-primary-600 text-white px-4 py-2 rounded-lg inline-block transform -rotate-2">
                <span className="font-bold text-sm md:text-base">SAVE £{saveAmount} VS Apple</span>
              </div>
            </div>
          )}

          {/* Repair Icon */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
            <Image
              src={image || getRepairImage(repairId)}
              alt={title}
              width={160}
              height={160}
              className="object-contain w-full h-full p-4"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              unoptimized
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-600 mb-4">
            {title}
          </h3>

          {/* Price */}
          <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            £{price}
          </div>

          {/* Variant Selection */}
          {variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Color
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl text-neutral-900 font-medium focus:outline-none focus:border-primary-500 transition-colors"
              >
                {variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookRepair}
              className="w-full px-6 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Book Repair</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{addedToCart ? "Added to Cart!" : "Add to Cart"}</span>
            </motion.button>
          </div>
        </div>

        {/* Right Column - Description, Warranty, Time */}
        <div className="flex flex-col justify-between">
          {/* Repair Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 mb-3">Repair description</h4>
            <p className="text-neutral-700 leading-relaxed">{description}</p>
          </div>

          {/* Warranty */}
          <div className="border-t border-neutral-200 pt-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-900">Warranty:</span>
              <span className="text-primary-600 font-bold text-lg">{warranty}</span>
            </div>
          </div>

          {/* Repair Time */}
          <div className="border-t border-neutral-200 pt-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-900">Repair time:</span>
              <span className="text-primary-600 font-bold text-lg">{repairTime}</span>
            </div>
          </div>

          {/* Booking Note */}
          <div className="mt-auto">
            <p className="text-sm text-neutral-600 leading-relaxed">
              Please ensure you book online prior to arriving, so we can make sure your required part is on site and ready for your repair. Note: this time is an estimate, and may vary slightly depending on location.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

