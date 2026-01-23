"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Mail, Smartphone } from "lucide-react";
import Link from "next/link";

export default function MailInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const brand = searchParams.get("brand");
  const device = searchParams.get("device");
  const repair = searchParams.get("repair");
  const variant = searchParams.get("variant");

  const handleContinue = () => {
    const params = new URLSearchParams({
      brand: brand || "",
      device: device || "",
      repair: repair || "",
      service: "mail",
      ...(variant && { variant }),
    });
    router.push(`/book/confirm?${params.toString()}`);
  };

  const getBackUrl = () => {
    return `/book/service?brand=${brand}&device=${device}&repair=${repair}${variant ? `&variant=${variant}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
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
                      step <= 2 ? "bg-accent-900" : "bg-neutral-300"
                    }`}
                  />
                  {step === 2 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent-900"></div>
                    </div>
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`w-16 h-0.5 ${
                      step <= 1 ? "bg-accent-900" : "bg-neutral-200"
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-4">
            Mail-in service
          </h1>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Thank you for selecting our mail-in repair service. This is our most widely accessible service and ideal for customers who do not live near one of our service centres.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Left: What's the process? */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
              What's the process?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-neutral-700">
                    We will send you a mail-in pack, within 1-2 business days of receiving your order.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-neutral-700">
                    Place the device inside the pack and drop into your local post office.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-neutral-700">
                    Once we receive your device, we will diagnose the issue, complete the repair, and mail your device back to you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: How long will it take? */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
              How long will it take?
            </h2>
            <div className="space-y-4">
              <p className="text-neutral-700">
                Usually, your device will be returned to you within{" "}
                <span className="font-bold text-primary-600">
                  2-3 business days from the point we receive your device
                </span>{" "}
                at our central service centre.
              </p>
              <p className="text-sm text-neutral-600">
                In certain circumstances, depending on the nature of the issue and parts availability, your repair may take longer than this. In these circumstances we will contact you so that you remain up to date on how your repair is progressing.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="px-12 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
}

