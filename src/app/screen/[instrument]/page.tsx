import { notFound } from "next/navigation";
import Link from "next/link";
import { getInstrument, getAllInstruments } from "@/lib/screening/instruments";
import { QuestionnaireFlow } from "@/components/screening/questionnaire-flow";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllInstruments().map((i) => ({ instrument: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ instrument: string }>;
}) {
  const { instrument: id } = await params;
  const instrument = getInstrument(id);
  if (!instrument) return { title: "Screening" };

  return {
    title: `${instrument.name} Screening`,
    description: instrument.description,
  };
}

export default async function InstrumentPage({
  params,
}: {
  params: Promise<{ instrument: string }>;
}) {
  const { instrument: id } = await params;
  const instrument = getInstrument(id);

  if (!instrument) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Link href="/screen">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Screening Tools
        </Button>
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-warm-900">
          {instrument.fullName}
        </h1>
        <p className="mt-2 text-warm-500 text-sm">
          {instrument.questionCount} questions &middot; {instrument.citation}
        </p>
      </div>

      <QuestionnaireFlow instrument={instrument} />
    </div>
  );
}
