"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Package } from "lucide-react";
import Link from "next/link";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import { getRepairPricing, getRepairTitle, getRepairDescription } from "@/lib/pricing";

export default function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const brandId = searchParams.get("brand");
  const deviceId = searchParams.get("device");
  const repairId = searchParams.get("repair");
  const variant = searchParams.get("variant");
  const service = searchParams.get("service") || "visit";

  // Get brand and device info
  const brand = brandsData.brands.find((b) => b.id === brandId);
  const device = brand?.models.find((m) => m.id === deviceId);
  const repair = repairsData.repairTypes.find((r) => r.id === repairId);

  // Handle camera sub-types
  let subType: "front" | "rear" | "lens" | undefined = undefined;
  if (repairId === "camera" && variant) {
    if (variant === "front" || variant === "rear" || variant === "lens") {
      subType = variant;
    }
  }

  // Get pricing
  const pricing = deviceId && repairId ? getRepairPricing(deviceId, repairId, subType) : null;
  const repairTitle = device && repairId ? getRepairTitle(repairId, device.name, subType) : repair?.name || "Repair";
  const repairDescription = device && repairId ? getRepairDescription(repairId, device.name, subType) : repair?.description || "";

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    devicePasscode: "",
    mobileNetwork: "",
    additionalInfo: "",
  });

  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email to Phonesnmacs40@gmail.com
    const emailBody = `Repair Booking Request\n\nCustomer Details:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPostcode: ${formData.postcode}\n\nRepair Details:\nBrand: ${brand?.name || brandId}\nDevice: ${device?.name || deviceId}\nRepair: ${repairTitle}\nService Type: ${service}\nPrice: £${totalCost.toFixed(2)}\n\nAdditional Info:\nDevice Passcode: ${formData.devicePasscode ? "Provided" : "Not provided"}\nMobile Network: ${formData.mobileNetwork || "Not specified"}\nAdditional Information: ${formData.additionalInfo || "None"}\nNewsletter: ${newsletter ? "Yes" : "No"}`;
    const mailtoLink = `mailto:Phonesnmacs40@gmail.com?subject=Repair Booking: ${repairTitle}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    console.log("Form submitted:", { formData, brandId, deviceId, repairId, variant, service, pricing });
    alert("Booking confirmed! We'll contact you shortly to finalize your repair.");
  };

  const getBackUrl = () => {
    if (service === "mail") {
      return `/book/mail-in?brand=${brandId}&device=${deviceId}&repair=${repairId}${variant ? `&variant=${variant}` : ""}`;
    }
    return `/book/service?brand=${brandId}&device=${deviceId}&repair=${repairId}${variant ? `&variant=${variant}` : ""}`;
  };

  // Calculate additional costs
  const mailInPackCost = 10.00;
  const callOutServiceCharge = 25.00;
  const totalCost = pricing 
    ? pricing.price + 
      (service === "mail" ? mailInPackCost : 0) + 
      (service === "callout" ? callOutServiceCharge : 0)
    : 0;

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={getBackUrl()}
              className="inline-flex items-center space-x-2 text-accent-900 hover:text-primary-600 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>GO BACK</span>
            </Link>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-0 mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className="relative">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      step <= 4 ? "bg-accent-900" : "bg-neutral-300"
                    }`}
                  />
                  {step === 4 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent-900"></div>
                    </div>
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`w-16 h-0.5 ${
                      step <= 3 ? "bg-accent-900" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-4">
            Please confirm your details!
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Your Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-accent-900 mb-6">
              Your details
            </h2>
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="devicePasscode" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Device Passcode *
                </label>
                <input
                  type="text"
                  id="devicePasscode"
                  value={formData.devicePasscode}
                  onChange={(e) => setFormData({ ...formData, devicePasscode: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="mobileNetwork" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Mobile Network
                </label>
                <select
                  id="mobileNetwork"
                  value={formData.mobileNetwork}
                  onChange={(e) => setFormData({ ...formData, mobileNetwork: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors bg-white"
                >
                  <option value="">Select Network</option>
                  <option value="ee">EE</option>
                  <option value="vodafone">Vodafone</option>
                  <option value="o2">O2</option>
                  <option value="three">Three</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-accent-900 mb-2">
                  Any additional information? (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={4}
                  placeholder="e.g. I have an additional device to repair"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors resize-none"
                />
              </div>
            </form>
          </motion.div>

          {/* Right: Repair Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-accent-900 mb-6">
              Repair details
            </h2>
            <div className="space-y-6">
              {/* Repair Type */}
              <div>
                <p className="text-sm text-neutral-600 mb-1">Repair Type:</p>
                <p className="font-semibold text-neutral-900">{device?.name || "Device"}</p>
                <p className="font-semibold text-neutral-900">{repairTitle}</p>
                {service === "mail" && (
                  <p className="text-sm text-neutral-600 mt-1">- Warehouse</p>
                )}
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  £{pricing?.price || 0}
                </p>
              </div>

              {/* Mail-in Pack (if mail service) */}
              {service === "mail" && (
                <div className="border-t border-neutral-300 pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 mb-1">Mail-in Pack:</p>
                      <p className="text-sm text-neutral-600">
                        Royal Mail special delivery for maximum speed and security.
                      </p>
                    </div>
                    <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 ml-4" />
                  </div>
                  <p className="text-xl font-bold text-primary-600">
                    £{mailInPackCost.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Call-out Service Charge (if callout service) */}
              {service === "callout" && (
                <div className="border-t border-neutral-300 pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 mb-1">Call-out Service:</p>
                      <p className="text-sm text-neutral-600">
                        We come to your doorstep - 12-24 hour service
                      </p>
                    </div>
                    <Package className="w-6 h-6 text-primary-600 flex-shrink-0 ml-4" />
                  </div>
                  <p className="text-xl font-bold text-primary-600">
                    £{callOutServiceCharge.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Total Cost */}
              <div className="border-t border-neutral-300 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-neutral-900">Total cost:</p>
                  <p className="text-3xl font-bold text-primary-600">
                    £{totalCost.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Checkbox */}
        <div className="max-w-4xl mx-auto mb-8">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-1 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-600"
            />
            <span className="text-neutral-700 text-sm">
              To provide further peace of mind, from time to time we like to send our loyal customers special offers, promotions & useful advice.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            type="submit"
            form="booking-form"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl"
          >
            Continue to Payment
          </motion.button>
        </div>
      </div>
    </div>
  );
}

