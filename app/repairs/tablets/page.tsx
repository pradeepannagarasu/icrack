import { notFound } from "next/navigation";
import brandsData from "@/data/brands.json";
import { getBrandsByCategory } from "@/lib/categoryFilters";
import Link from "next/link";
import Image from "next/image";
import { getBrandImage, getModelImage, categoryImages } from "@/lib/deviceImages";
import BackLink from "@/components/ui/BackLink";

export async function generateMetadata() {
  return {
    title: "Tablet Repairs | iCrack",
    description: "Expert tablet repair services for all major brands including iPad, Galaxy Tab, and more.",
  };
}

export default function TabletsPage() {
  const tabletBrands = getBrandsByCategory("tablets");

  if (tabletBrands.length === 0) {
    notFound();
  }

  return (
    <div className="pt-20 lg:pt-[176px] pb-16">
      <section className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/repairs" label="Back to repairs" />
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4">
            Tablet Repairs
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Expert tablet repair services for all major brands. Fast turnaround times and quality parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabletBrands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={categoryImages.tablets}
                    alt={`${brand.name} tablets`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  {brand.name}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {brand.models.map((model) => (
                  <Link
                    key={model.id}
                    href={`/repairs/tablets/${model.id}`}
                    className="p-4 bg-neutral-50 hover:bg-primary-50 rounded-xl border-2 border-neutral-200 hover:border-primary-300 transition-all group"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={getModelImage(brand.id, model.id)}
                          alt={model.name}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full p-1"
                          unoptimized
                        />
                      </div>
                      <span className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-sm text-center">
                        {model.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

