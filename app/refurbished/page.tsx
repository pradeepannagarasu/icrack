"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { refurbishedIphones } from "@/lib/refurbished";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function RefurbishedPage() {
  return (
    <div className="pt-20 lg:pt-[176px] pb-16 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-8 sm:mb-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Refurbished Apple iPhones
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 px-2">
              Save on premium, fully-tested iPhones with 12-month warranty, multiple colours and storage options.
            </p>
          </ScrollReveal>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {refurbishedIphones.map((phone, index) => (
              <ScrollReveal key={phone.id} delay={index * 0.05}>
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-neutral-200 p-4 sm:p-6 flex flex-col">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-50 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/mobile.png"
                        alt={phone.name}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full p-2 sm:p-3"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-display font-semibold text-neutral-900 mb-1">
                        {phone.name}
                      </h2>
                      <p className="text-sm text-primary-600 font-semibold mb-1">
                        From £{phone.basePrice}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {phone.condition} condition • 12-month warranty
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-3">
                    <p className="text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wide">
                      Storage
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {phone.storageOptions.map((s) => (
                        <span
                          key={s}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-medium border-primary-200 text-primary-700 bg-primary-50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wide">
                      Colours
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {phone.colours.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 sm:px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] sm:text-[11px] font-medium text-neutral-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2 gap-2">
                    <Link
                      href={`/refurbished/${phone.id}`}
                      className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/refurbished/${phone.id}?mode=enquire`}
                      className="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-600 text-white text-xs sm:text-sm font-semibold hover:bg-primary-700 transition-all hover:shadow-md"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


