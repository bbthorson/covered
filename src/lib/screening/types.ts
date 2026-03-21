export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface ScoringRange {
  min: number;
  max: number;
  level: RiskLevel;
  label: string;
  description: string;
  recommendations: string[];
}

/**
 * InstrumentMeta contains our app-specific metadata that wraps a FHIR Questionnaire.
 * The FHIR Questionnaire itself lives in the `questionnaire` field.
 */
export interface InstrumentMeta {
  id: string;
  name: string;
  fullName: string;
  description: string;
  citation: string;
  focus: "alcohol" | "drugs";
  questionCount: number;
  maxScore: number;
  scoringRanges: ScoringRange[];
  questionnaire: FhirQuestionnaire;
}

export interface ScreeningResult {
  instrumentId: string;
  instrumentName: string;
  totalScore: number;
  maxPossibleScore: number;
  level: RiskLevel;
  label: string;
  description: string;
  recommendations: string[];
}

// FHIR R4 Questionnaire types (subset used by our instruments)
export interface FhirQuestionnaire {
  resourceType: "Questionnaire";
  id: string;
  url?: string;
  status: "active" | "draft" | "retired";
  title: string;
  description?: string;
  extension?: FhirExtension[];
  item: FhirQuestionnaireItem[];
}

export interface FhirQuestionnaireItem {
  linkId: string;
  text: string;
  type: "group" | "choice" | "integer" | "decimal" | "display";
  required?: boolean;
  readOnly?: boolean;
  extension?: FhirExtension[];
  answerOption?: FhirAnswerOption[];
  item?: FhirQuestionnaireItem[];
}

export interface FhirAnswerOption {
  valueCoding: {
    code: string;
    display: string;
    system?: string;
  };
  extension?: FhirExtension[];
}

export interface FhirExtension {
  url: string;
  valueDecimal?: number;
  valueString?: string;
  valueCode?: string;
  valueExpression?: {
    language: string;
    expression: string;
    name?: string;
  };
  extension?: FhirExtension[];
}

// FHIR R4 QuestionnaireResponse types
export interface FhirQuestionnaireResponse {
  resourceType: "QuestionnaireResponse";
  questionnaire?: string;
  status: "in-progress" | "completed" | "amended";
  item?: FhirQuestionnaireResponseItem[];
}

export interface FhirQuestionnaireResponseItem {
  linkId: string;
  text?: string;
  answer?: FhirQuestionnaireResponseAnswer[];
  item?: FhirQuestionnaireResponseItem[];
}

export interface FhirQuestionnaireResponseAnswer {
  valueCoding?: {
    code: string;
    display: string;
    system?: string;
  };
  valueInteger?: number;
  valueDecimal?: number;
  valueString?: string;
}
