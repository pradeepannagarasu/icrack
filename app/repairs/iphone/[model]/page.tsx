import { notFound } from "next/navigation";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import DeviceRepairPage from "@/components/repairs/DeviceRepairPage";

export async function generateStaticParams() {
  const appleBrand = brandsData.brands.find((b) => b.id === "apple");
  if (!appleBrand) return [];
  
  return appleBrand.models
    .filter((m) => m.id.includes("iphone") && !m.id.includes("ipad"))
    .map((model) => ({
      model: model.id,
    }));
}

export default function iPhoneModelPage({
  params,
}: {
  params: { model: string };
}) {
  const appleBrand = brandsData.brands.find((b) => b.id === "apple");
  const device = appleBrand?.models.find((m) => m.id === params.model);

  if (!device || !appleBrand) {
    notFound();
  }

  const repairs = repairsData.repairTypes;

  return (
    <DeviceRepairPage
      brand={appleBrand}
      device={device}
      repairs={repairs}
    />
  );
}

