import { notFound } from "next/navigation";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import DeviceRepairPage from "@/components/repairs/DeviceRepairPage";

export async function generateStaticParams() {
  const brands = brandsData.brands;
  const params: { model: string }[] = [];
  
  brands.forEach((brand) => {
    brand.models
      .filter((m) => m.id.includes("macbook") || m.id.includes("mac") || m.id.includes("xps") || m.id.includes("spectre") || m.id.includes("thinkpad") || m.id.includes("yoga") || m.id.includes("inspiron") || m.id.includes("envy") || m.id.includes("pavilion") || m.id.includes("elitebook") || m.id.includes("ideapad") || m.id.includes("latitude"))
      .forEach((model) => {
        params.push({ model: model.id });
      });
  });
  
  return params;
}

export default function LaptopModelPage({
  params,
}: {
  params: { model?: string };
}) {
  const modelSlug = params?.model;
  if (!modelSlug) {
    notFound();
  }
  // Find the brand and device
  let brand = null;
  let device = null;
  
  for (const b of brandsData.brands) {
    const foundDevice = b.models.find((m) => m.id === modelSlug);
    if (foundDevice && (foundDevice.id.includes("macbook") || foundDevice.id.includes("mac") || foundDevice.id.includes("xps") || foundDevice.id.includes("spectre") || foundDevice.id.includes("thinkpad") || foundDevice.id.includes("yoga") || foundDevice.id.includes("inspiron") || foundDevice.id.includes("envy") || foundDevice.id.includes("pavilion") || foundDevice.id.includes("elitebook") || foundDevice.id.includes("ideapad") || foundDevice.id.includes("latitude"))) {
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

