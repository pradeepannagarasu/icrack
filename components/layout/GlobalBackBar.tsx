"use client";

import { usePathname } from "next/navigation";
import BackLink from "@/components/ui/BackLink";

export default function GlobalBackBar() {
  const pathname = usePathname();

  // Hide on home page
  if (pathname === "/") return null;

  return (
    <div className="bg-white/95 border-b border-neutral-200 mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <BackLink label="Back" />
      </div>
    </div>
  );
}

