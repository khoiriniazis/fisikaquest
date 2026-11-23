import { notFound } from "next/navigation";
import { MaterialLesson } from "@/components/MaterialLesson";
import { materials } from "@/lib/materials";

type MaterialPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return materials.map((material) => ({ slug: material.slug }));
}

export default async function MaterialPage({ params }: MaterialPageProps) {
  const { slug } = await params;
  const material = materials.find((item) => item.slug === slug);
  if (!material) notFound();
  return <MaterialLesson material={material} />;
}