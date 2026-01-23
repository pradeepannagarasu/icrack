"use client";

import { Suspense } from "react";
import DeviceSelectorPage from "@/components/device-selector/DeviceSelectorPage";

export default function SelectDevicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DeviceSelectorPage />
    </Suspense>
  );
}

