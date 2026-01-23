"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { motion } from "framer-motion";

export default function CartIcon() {
  const { itemCount } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/cart"
      className="relative p-2 text-neutral-700 hover:text-primary-600 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </motion.span>
      )}
    </Link>
  );
}

