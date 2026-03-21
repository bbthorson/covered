import type { FhirAnswerOption, FhirQuestionnaireItem, FhirExtension } from "./types";

const ITEM_WEIGHT_URL = "http://hl7.org/fhir/StructureDefinition/itemWeight";
const CALCULATED_EXPRESSION_URL =
  "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression";
const ORDINAL_VALUE_URL =
  "http://hl7.org/fhir/StructureDefinition/ordinalValue";

/**
 * Create a choice question item with weighted answer options.
 */
export function choiceItem(
  linkId: string,
  text: string,
  options: { label: string; code: string; weight: number }[],
  required = true
): FhirQuestionnaireItem {
  return {
    linkId,
    text,
    type: "choice",
    required,
    answerOption: options.map((opt) => ({
      valueCoding: {
        code: opt.code,
        display: opt.label,
      },
      extension: [
        {
          url: ITEM_WEIGHT_URL,
          valueDecimal: opt.weight,
        },
      ],
    })),
  };
}

/**
 * Build a FHIRPath expression that sums itemWeights across specified linkIds.
 * Uses the weight() function supported by formbox-renderer.
 */
export function buildScoreFhirPath(linkIds: string[]): string {
  const conditions = linkIds.map((id) => `linkId='${id}'`).join(" or ");
  return `%context.item.where(${conditions}).answer.value.weight().aggregate($this + $total, 0)`;
}

/**
 * Create a calculated total score item.
 */
export function calculatedScoreItem(
  linkId: string,
  text: string,
  scoreLinkIds: string[]
): FhirQuestionnaireItem {
  return {
    linkId,
    text,
    type: "integer",
    readOnly: true,
    extension: [
      {
        url: CALCULATED_EXPRESSION_URL,
        valueExpression: {
          language: "text/fhirpath",
          expression: buildScoreFhirPath(scoreLinkIds),
        },
      },
    ],
  };
}
