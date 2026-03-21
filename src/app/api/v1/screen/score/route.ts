import { NextResponse } from "next/server";
import { getInstrument } from "@/lib/screening/instruments";
import { scoreFromQuestionnaireResponse, scoreFromTotal } from "@/lib/screening/score";
import type { FhirQuestionnaireResponse } from "@/lib/screening/types";

/**
 * POST /api/v1/screen/score
 *
 * Accepts either:
 * 1. A FHIR QuestionnaireResponse (preferred for EHR integration)
 *    { instrumentId: string, questionnaireResponse: FhirQuestionnaireResponse }
 *
 * 2. A simple score (for quick integration)
 *    { instrumentId: string, totalScore: number }
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 }
    );
  }

  const instrumentId = body.instrumentId;
  if (typeof instrumentId !== "string") {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "instrumentId is required" } },
      { status: 400 }
    );
  }

  const instrument = getInstrument(instrumentId);
  if (!instrument) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: `Instrument "${instrumentId}" not found` } },
      { status: 404 }
    );
  }

  try {
    // Option 1: FHIR QuestionnaireResponse
    if (body.questionnaireResponse) {
      const qr = body.questionnaireResponse as FhirQuestionnaireResponse;
      const result = scoreFromQuestionnaireResponse(instrument, qr);
      return NextResponse.json({ data: result });
    }

    // Option 2: Simple total score
    if (typeof body.totalScore === "number") {
      const result = scoreFromTotal(instrument, body.totalScore);
      return NextResponse.json({ data: result });
    }

    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message:
            "Provide either 'questionnaireResponse' (FHIR QuestionnaireResponse) or 'totalScore' (number)",
        },
      },
      { status: 400 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scoring failed";
    return NextResponse.json(
      { error: { code: "SCORING_ERROR", message } },
      { status: 400 }
    );
  }
}
