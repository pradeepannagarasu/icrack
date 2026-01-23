import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-20 lg:pt-[176px] pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-display font-bold text-neutral-900 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-display font-semibold text-neutral-900 mb-4">
          Repair Service Not Found
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          The repair service you're looking for doesn't exist. Please check the URL or browse our available repair services.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/repairs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>View All Repairs</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-100 text-neutral-900 rounded-xl font-semibold hover:bg-neutral-200 transition-all"
          >
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

