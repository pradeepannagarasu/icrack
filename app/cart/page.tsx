"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import Link from "next/link";
import BackLink from "@/components/ui/BackLink";

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity, setEmail, clearCart } = useCart();
  const [email, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail(email.trim());
      setSubmitted(true);
      // In a real app, you would send this to an API
      console.log("Cart submitted with email:", email, items);
      setTimeout(() => {
        clearCart();
        setEmailInput("");
        setSubmitted(false);
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 lg:pt-[176px] pb-16 min-h-screen bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-2xl p-12 shadow-lg"
          >
            <CheckCircle2 className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              We've received your order and will send updates to:
            </p>
            <p className="text-xl font-semibold text-primary-600 mb-8">{email}</p>
            <p className="text-neutral-600">
              You'll receive a confirmation email shortly with order details and next steps.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 lg:pt-[176px] pb-16 min-h-screen bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BackLink href="/" label="Continue shopping" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white rounded-2xl p-12 shadow-lg"
          >
            <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Start adding items to your cart to get started!
            </p>
            <Link
              href="/repairs"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-xl"
            >
              <span>Browse Repairs</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-[176px] pb-16 min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink href="/" label="Continue shopping" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-600">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-neutral-200"
              >
                <div className="flex items-start gap-4">
                  {item.image && (
                    <div className="w-20 h-20 bg-neutral-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full p-2"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">{item.name}</h3>
                    {item.details && (
                      <div className="text-sm text-neutral-600 mb-2">
                        {item.details.brand && item.details.device && (
                          <p>
                            {item.details.brand} {item.details.device}
                          </p>
                        )}
                        {item.details.storage && <p>Storage: {item.details.storage}</p>}
                        {item.details.color && <p>Color: {item.details.color}</p>}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.details)
                          }
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-neutral-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.details)
                          }
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-bold text-primary-600">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id, item.details)}
                          className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-neutral-200 sticky top-24"
            >
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-primary-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-neutral-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-neutral-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">£{total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-900 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    We'll send order updates and confirmation to this email
                  </p>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-neutral-900">Payment Options</p>
                  
                  {/* Klarna Option */}
                  <div className="border-2 border-primary-300 rounded-xl p-4 bg-primary-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/images/klarna.jpg"
                          alt="Klarna"
                          width={60}
                          height={20}
                          className="object-contain"
                        />
                        <span className="text-sm font-semibold text-neutral-900">Pay with Klarna</span>
                      </div>
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full font-semibold">
                        Popular
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      Split your payment into 3 interest-free instalments. Subject to status. T&Cs apply.
                    </p>
                  </div>

                  {/* Standard Payment */}
                  <div className="border border-neutral-300 rounded-xl p-4">
                    <p className="text-sm font-semibold text-neutral-900 mb-1">Standard Payment</p>
                    <p className="text-xs text-neutral-600">
                      We'll contact you to arrange payment via card, bank transfer, or in-store.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Complete Order</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-xs text-neutral-500 mt-4 text-center">
                By completing your order, you agree to receive email updates about your purchase.
                We'll contact you to finalize payment and delivery details.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

