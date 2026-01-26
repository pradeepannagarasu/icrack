"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Mail, Home } from "lucide-react";
import Link from "next/link";

export default function ServiceSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const brand = searchParams.get("brand");
  const device = searchParams.get("device");
  const repair = searchParams.get("repair");
  const variant = searchParams.get("variant");

  const handleServiceSelect = (serviceType: "visit" | "mail" | "callout") => {
    const params = new URLSearchParams({
      brand: brand || "",
      device: device || "",
      repair: repair || "",
      service: serviceType,
      ...(variant && { variant }),
    });

    if (serviceType === "mail") {
      // Navigate to mail-in details page
      router.push(`/book/mail-in?${params.toString()}`);
    } else if (serviceType === "callout") {
      // Navigate to call-out booking (for now, go to confirmation with callout service)
      router.push(`/book/confirm?${params.toString()}`);
    } else {
      // Navigate to store selection (for now, go to confirmation)
      router.push(`/book/confirm?${params.toString()}`);
    }
  };

  // Determine back URL based on where user came from
  const getBackUrl = () => {
    if (brand && device) {
      // Determine category
      let category = "phones";
      if (brand === "apple") {
        if (device.includes("ipad")) category = "tablets";
        else if (device.includes("iphone")) category = "iphone";
        else if (device.includes("macbook") || device.includes("mac")) category = "laptops";
      } else if (brand === "samsung" && device.includes("tab")) {
        category = "tablets";
      }
      return `/repairs/${category}/${device}`;
    }
    // If no device selected, go back to repairs page or book page
    if (repair) {
      return `/repairs/${repair}`;
    }
    return "/repairs";
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-[176px] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      step === 1 ? "bg-accent-900" : "bg-neutral-300"
                    }`}
                  />
                  {step === 1 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent-900"></div>
                    </div>
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`w-16 h-0.5 ${
                      step === 1 ? "bg-accent-900" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-8">
            How do you want us to fix your device?
          </h1>
        </motion.div>

        {/* Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Visit Us Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect("visit")}
            className="bg-white rounded-2xl p-8 md:p-12 border-2 border-primary-200 hover:border-primary-400 hover:shadow-xl transition-all text-center group"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-accent-900 rounded-full flex items-center justify-center group-hover:bg-accent-800 transition-colors relative">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-600">
                Visit us
              </h2>
              <p className="text-sm text-neutral-600 mt-2">
                Choose from one of our 38 nationwide locations.
              </p>
            </div>
          </motion.button>

          {/* Mail-in Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect("mail")}
            className="bg-white rounded-2xl p-8 md:p-12 border-2 border-primary-200 hover:border-primary-400 hover:shadow-xl transition-all text-center group"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-accent-900 rounded-full flex items-center justify-center group-hover:bg-accent-800 transition-colors">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-600">
                Mail-in
              </h2>
              <p className="text-sm text-neutral-600 mt-2">
                No stores close to you? Send your device to us!
              </p>
            </div>
          </motion.button>

          {/* Call-out Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect("callout")}
            className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border-2 border-primary-400 hover:border-primary-500 hover:shadow-xl transition-all text-center group relative overflow-hidden"
          >
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Popular
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-colors shadow-lg">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-600">
                Call out
              </h2>
              <p className="text-sm text-neutral-700 mt-2 font-medium">
                We come to your doorstep - 12-24 hour service
              </p>
            </div>
          </motion.button>
        </div>

      </div>
    </div>
  );
}

