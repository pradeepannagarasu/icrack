import { notFound } from "next/navigation";
import { refurbishedIphones } from "@/lib/refurbished";
import RefurbishedDetailPageClient from "./RefurbishedDetailPageClient";
import { Suspense } from "react";

export async function generateStaticParams() {
  return refurbishedIphones.map((phone) => ({
    id: phone.id,
  }));
}

export default function RefurbishedDetailPage({ params }: { params: { id: string } }) {
  const id = params?.id;
  if (!id) {
    notFound();
  }
  const phone = refurbishedIphones.find((p) => p.id === id);
  if (!phone) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="pt-20 lg:pt-[176px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <RefurbishedDetailPageClient phone={phone} />
    </Suspense>
  );
}
