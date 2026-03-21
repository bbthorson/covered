import { NextResponse } from "next/server";
import { getAllInstruments, getInstrument } from "@/lib/screening/instruments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // If ?id= is provided, return the full FHIR Questionnaire
  if (id) {
    const instrument = getInstrument(id);
    if (!instrument) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: `Instrument "${id}" not found` } },
        { status: 404 }
      );
    }
    // Return both the FHIR Questionnaire and our app metadata
    return NextResponse.json({
      data: {
        id: instrument.id,
        name: instrument.name,
        fullName: instrument.fullName,
        description: instrument.description,
        citation: instrument.citation,
        focus: instrument.focus,
        questionCount: instrument.questionCount,
        maxScore: instrument.maxScore,
        scoringRanges: instrument.scoringRanges,
        questionnaire: instrument.questionnaire,
      },
    });
  }

  // List all instruments (summary only, no full questionnaire)
  const instruments = getAllInstruments().map((i) => ({
    id: i.id,
    name: i.name,
    fullName: i.fullName,
    description: i.description,
    focus: i.focus,
    questionCount: i.questionCount,
    maxScore: i.maxScore,
  }));

  return NextResponse.json({ data: instruments });
}
