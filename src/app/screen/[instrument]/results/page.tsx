import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Screening Results",
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ instrument: string }>;
}) {
  const { instrument } = await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href={`/screen/${instrument}`}>
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Screening
        </Button>
      </Link>

      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-warm-900">
          {instrument.toUpperCase()} Results
        </h1>
        <p className="mt-4 text-warm-500">
          Results display will be built here in Phase 2.
        </p>
      </div>
    </div>
  );
}
