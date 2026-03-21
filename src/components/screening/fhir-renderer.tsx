"use client";

import Renderer from "@formbox/renderer";
import { theme } from "@formbox/hs-theme";
import "@formbox/hs-theme/style.css";
import type { FhirQuestionnaire, FhirQuestionnaireResponse } from "@/lib/screening/types";

interface FhirRendererProps {
  questionnaire: FhirQuestionnaire;
  onChange?: (response: FhirQuestionnaireResponse) => void;
  onSubmit?: (response: FhirQuestionnaireResponse) => void;
}

export default function FhirRendererWrapper({
  questionnaire,
  onChange,
  onSubmit,
}: FhirRendererProps) {
  return (
    <Renderer
      fhirVersion="r4"
      questionnaire={questionnaire as any}
      theme={theme}
      onChange={onChange as any}
      onSubmit={onSubmit as any}
    />
  );
}
