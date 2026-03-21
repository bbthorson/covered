import type {
  InstrumentMeta,
  ScreeningResult,
  FhirQuestionnaireResponse,
} from "./types";

const ITEM_WEIGHT_URL = "http://hl7.org/fhir/StructureDefinition/itemWeight";

/**
 * Extract the total score from a QuestionnaireResponse by looking up
 * itemWeight extensions on the matching Questionnaire answerOptions.
 */
export function scoreFromQuestionnaireResponse(
  instrument: InstrumentMeta,
  response: FhirQuestionnaireResponse
): ScreeningResult {
  const items = response.item ?? [];
  let totalScore = 0;

  for (const qItem of instrument.questionnaire.item) {
    // Skip the calculated total-score item
    if (qItem.type !== "choice" || !qItem.answerOption) continue;

    const responseItem = items.find((ri) => ri.linkId === qItem.linkId);
    if (!responseItem?.answer?.[0]?.valueCoding) {
      throw new Error(`Missing answer for question ${qItem.linkId}`);
    }

    const answerCode = responseItem.answer[0].valueCoding.code;
    const matchingOption = qItem.answerOption.find(
      (opt) => opt.valueCoding.code === answerCode
    );

    if (!matchingOption) {
      throw new Error(
        `Invalid answer code "${answerCode}" for question ${qItem.linkId}`
      );
    }

    const weightExt = matchingOption.extension?.find(
      (ext) => ext.url === ITEM_WEIGHT_URL
    );
    totalScore += weightExt?.valueDecimal ?? 0;
  }

  return classifyScore(instrument, totalScore);
}

/**
 * Score from a simple numeric total (used by API and tests).
 */
export function scoreFromTotal(
  instrument: InstrumentMeta,
  totalScore: number
): ScreeningResult {
  return classifyScore(instrument, totalScore);
}

/**
 * Classify a numeric score into a risk level using the instrument's scoring ranges.
 */
function classifyScore(
  instrument: InstrumentMeta,
  totalScore: number
): ScreeningResult {
  const range = instrument.scoringRanges.find(
    (r) => totalScore >= r.min && totalScore <= r.max
  );

  if (!range) {
    throw new Error(
      `No scoring range found for score ${totalScore} in instrument ${instrument.id}`
    );
  }

  return {
    instrumentId: instrument.id,
    instrumentName: instrument.name,
    totalScore,
    maxPossibleScore: instrument.maxScore,
    level: range.level,
    label: range.label,
    description: range.description,
    recommendations: range.recommendations,
  };
}
