import { notFound } from "next/navigation";
import type { Metadata } from "next";
import repairsData from "@/data/repairs.json";
import RepairDetailPage from "@/components/repairs/RepairDetailPage";

export async function generateStaticParams() {
  return repairsData.repairTypes.map((repair) => ({
    "repair-type": repair.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { "repair-type": string };
}): Promise<Metadata> {
  const repair = repairsData.repairTypes.find(
    (r) => r.id === params["repair-type"]
  );

  if (!repair) {
    return {
      title: "Repair Not Found - iCrack",
    };
  }

  return {
    title: `${repair.name} - iCrack Phone Repairs`,
    description: `${repair.description}. ${repair.duration} repair time with ${repair.warranty} warranty. Book your ${repair.name.toLowerCase()} today.`,
    keywords: `${repair.name.toLowerCase()}, phone repair, mobile repair, ${repair.commonIssues.join(", ")}`,
  };
}

export default function RepairTypePage({
  params,
}: {
  params: { "repair-type": string };
}) {
  const repair = repairsData.repairTypes.find(
    (r) => r.id === params["repair-type"]
  );

  if (!repair) {
    notFound();
  }

  return <RepairDetailPage repair={repair} />;
}

