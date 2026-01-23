"use client";

import { Suspense } from "react";
import MailInContent from "./MailInContent";

export default function MailInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MailInContent />
    </Suspense>
  );
}

