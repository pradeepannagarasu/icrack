import { notFound } from "next/navigation";
import type { Metadata } from "next";
import repairsData from "@/data/repairs.json";
import RepairDetailPage from "@/components/repairs/RepairDetailPage";

export async function generateStaticParams() {
  return (repairsData.repairTypes || [])
    .filter((repair) => repair && repair.id)
    .map((repair) => ({ "repair-type": repair.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { "repair-type": string };
}): Promise<Metadata> {
  const repairType = params?.["repair-type"];
  if (!repairType) {
    return { title: "Repair - iCrack" };
  }
  const repair = (repairsData.repairTypes || []).find(
    (r) => r && r.id === repairType
  );

  if (!repair?.id) {
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
  const repairType = params?.["repair-type"];
  if (!repairType) {
    notFound();
  }
  const repair = (repairsData.repairTypes || []).find(
    (r) => r && r.id === repairType
  );

  if (!repair?.id) {
    notFound();
  }

  return <RepairDetailPage repair={repair} />;
}

