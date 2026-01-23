"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import { refurbishedIphones } from "@/lib/refurbished";
import { getBrandImage, getModelImage, getRepairImage } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const searchResults: any[] = [];

    // Search brands and models
    const brands = brandsData.brands;
    brands.forEach((brand) => {
      if (brand.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: "brand",
          title: brand.name,
          description: `Browse ${brand.name} devices`,
          href: `/repairs/${brand.id}`,
          image: getBrandImage(brand.id),
        });
      }

      brand.models.forEach((model) => {
        if (model.name.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            type: "device",
            title: `${brand.name} ${model.name}`,
            description: `Repair services for ${model.name}`,
            href: `/repairs/phones/${model.id}`,
            image: getModelImage(brand.id, model.id),
          });
        }
      });
    });

    // Search repairs
    const repairs = repairsData.repairTypes;
    repairs.forEach((repair) => {
      if (
        repair.name.toLowerCase().includes(searchTerm) ||
        repair.description.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: "repair",
          title: repair.name,
          description: repair.description,
          href: `/repairs/${repair.id}`,
          image: getRepairImage(repair.id),
        });
      }
    });

    // Search refurbished phones
    refurbishedIphones.forEach((phone) => {
      if (phone.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: "refurbished",
          title: phone.name,
          description: `Refurbished ${phone.name} - From £${phone.basePrice}`,
          href: `/refurbished/${phone.id}`,
          image: "/images/iphone.png", // Default image
        });
      }
    });

    setResults(searchResults);
  }, [query]);

  return (
    <div className="pt-20 lg:pt-[176px] pb-16 min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink href="/" label="Go back" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-neutral-600">
              Found {results.length} {results.length === 1 ? "result" : "results"} for "
              {query}"
            </p>
          )}
        </motion.div>

        {!query ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-lg text-neutral-600">Enter a search term to find products and services</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-lg text-neutral-600 mb-2">No results found for "{query}"</p>
            <p className="text-neutral-500">Try searching for a device, brand, or repair type</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={`${result.href}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={result.href}
                  className="block bg-white rounded-2xl p-6 shadow-md border border-neutral-200 hover:shadow-xl hover:border-primary-300 transition-all group"
                >
                  <div className="w-full h-48 bg-neutral-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                    <Image
                      src={result.image || "/images/mobile.png"}
                      alt={result.title}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full p-4"
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">{result.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

