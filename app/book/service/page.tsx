"use client";

import { Suspense } from "react";
import ServiceSelectionContent from "./ServiceSelectionContent";

export default function ServiceSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceSelectionContent />
    </Suspense>
  );
}

