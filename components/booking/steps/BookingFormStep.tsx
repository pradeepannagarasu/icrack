"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Brand, Model, RepairType, BookingData } from "@/types";

interface BookingFormStepProps {
  brand: Brand;
  model: Model;
  repair: RepairType;
  onSubmit: (data: Partial<BookingData>) => void;
}

export default function BookingFormStep({
  brand,
  model,
  repair,
  onSubmit,
}: BookingFormStepProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit(formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">
          Booking Submitted!
        </h2>
        <p className="text-lg text-neutral-600 mb-6">
          We've received your repair request for your {brand.name} {model.name}.
        </p>
        <p className="text-neutral-600">
          Our team will contact you shortly to confirm your appointment.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Repair Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Brand:</span>
            <span className="font-semibold text-neutral-900">{brand.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Device:</span>
            <span className="font-semibold text-neutral-900">{model.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Repair Type:</span>
            <span className="font-semibold text-neutral-900">{repair.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Duration:</span>
            <span className="font-semibold text-neutral-900">{repair.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Warranty:</span>
            <span className="font-semibold text-neutral-900">{repair.warranty}</span>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-semibold text-neutral-900 mb-2"
          >
            Full Name <span className="text-accent-600">*</span>
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            required
            value={formData.customerName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-600 focus:outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-neutral-900 mb-2"
          >
            Email Address <span className="text-accent-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-600 focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-neutral-900 mb-2"
          >
            Phone Number <span className="text-accent-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-600 focus:outline-none transition-colors"
            placeholder="+1 (234) 567-890"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-neutral-900 mb-2"
          >
            Preferred Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-600 focus:outline-none transition-colors"
          >
            <option value="">Select a location</option>
            <option value="downtown">Downtown Store</option>
            <option value="mall">Shopping Mall</option>
            <option value="airport">Airport Location</option>
            <option value="online">Online/Shipping</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-neutral-900 mb-2"
          >
            Additional Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-600 focus:outline-none transition-colors resize-none"
            placeholder="Tell us more about the issue or any special requirements..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Booking Request</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

