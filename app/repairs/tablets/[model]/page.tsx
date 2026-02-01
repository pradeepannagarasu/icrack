import { notFound } from "next/navigation";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import DeviceRepairPage from "@/components/repairs/DeviceRepairPage";

export async function generateStaticParams() {
  const brands = brandsData.brands || [];
  const params: { model: string }[] = [];
  brands.forEach((brand) => {
    (brand.models || [])
      .filter((m) => m && m.id && (m.id.includes("ipad") || m.id.includes("tab")))
      .forEach((model) => {
        params.push({ model: model.id });
      });
  });
  return params;
}

export default function TabletModelPage({
  params,
}: {
  params: { model?: string };
}) {
  const modelSlug = params?.model;
  if (!modelSlug) {
    notFound();
  }
  let brand = null;
  let device = null;
  const brands = brandsData.brands || [];
  for (const b of brands) {
    if (!b?.models) continue;
    const foundDevice = b.models.find((m) => m && m.id === modelSlug);
    if (foundDevice && (foundDevice.id.includes("ipad") || foundDevice.id.includes("tab"))) {
      brand = b;
      device = foundDevice;
      break;
    }
  }

  if (!device || !brand) {
    notFound();
  }

  const repairs = repairsData.repairTypes;

  return (
    <DeviceRepairPage
      brand={brand}
      device={device}
      repairs={repairs}
    />
  );
}

