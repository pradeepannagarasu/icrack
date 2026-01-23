"use client";

import { useSearchParams } from "next/navigation";
import BookingFlow from "@/components/booking/BookingFlow";
import { BookingStep } from "@/components/booking/BookingFlow";
import { BookingData } from "@/types";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function BookPageContent() {
  const searchParams = useSearchParams();
  const initialStep = (searchParams.get("step") as BookingStep) || "brand";

  const handleBookingComplete = (data: BookingData) => {
    // Handle booking completion
    // This could send data to an API, show confirmation, etc.
    console.log("Booking completed:", data);
    
    // In a real app, you might:
    // - Send to API endpoint
    // - Redirect to confirmation page
    // - Show success modal
  };

  return (
    <div className="pt-20 lg:pt-[176px] pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            Book Your Repair
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Follow the steps below to book your device repair. It only takes a few minutes!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <BookingFlow
            initialStep={initialStep}
            onComplete={handleBookingComplete}
          />
        </ScrollReveal>
      </div>
    </div>
  );
}

