import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Article",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/learn">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Resources
        </Button>
      </Link>

      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-warm-900">{slug}</h1>
        <p className="mt-4 text-warm-500">
          Article content will be rendered here in Phase 4.
        </p>
      </div>
    </div>
  );
}
