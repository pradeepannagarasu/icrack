import { notFound } from "next/navigation";
import brandsData from "@/data/brands.json";
import repairsData from "@/data/repairs.json";
import DeviceRepairPage from "@/components/repairs/DeviceRepairPage";

export async function generateStaticParams() {
  const brands = brandsData.brands;
  const params: { model: string }[] = [];
  
  brands.forEach((brand) => {
    brand.models
      .filter((m) => {
        // Exclude iPhones, iPads, MacBooks, and tablets
        return !m.id.includes("iphone") && 
               !m.id.includes("ipad") && 
               !m.id.includes("macbook") && 
               !m.id.includes("mac") &&
               !m.id.includes("tab");
      })
      .forEach((model) => {
        params.push({ model: model.id });
      });
  });
  
  return params;
}

export default function PhoneModelPage({
  params,
}: {
  params: { model: string };
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
    if (foundDevice && 
        !foundDevice.id.includes("iphone") && 
        !foundDevice.id.includes("ipad") && 
        !foundDevice.id.includes("macbook") && 
        !foundDevice.id.includes("mac") &&
        !foundDevice.id.includes("tab")) {
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

