"use client";

import { Suspense } from "react";
import BookingFlow from "@/components/booking/BookingFlow";
import { BookingStep } from "@/components/booking/BookingFlow";
import { BookingData } from "@/types";
import BookPageContent from "./BookPageContent";

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}

