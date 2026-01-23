"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackLink({ href, label = "Go back", className = "" }: BackLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!href) {
      e.preventDefault();
      router.back();
    }
  };

  const baseClasses =
    "inline-flex items-center space-x-2 text-accent-900 hover:text-primary-600 transition-colors font-semibold text-sm";

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={`${baseClasses} ${className}`}>
        <ArrowLeft className="w-4 h-4" />
        <span className="uppercase tracking-wide text-xs md:text-sm">{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={`${baseClasses} ${className}`} type="button">
      <ArrowLeft className="w-4 h-4" />
      <span className="uppercase tracking-wide text-xs md:text-sm">{label}</span>
    </button>
  );
}


