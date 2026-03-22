"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { InstrumentMeta, FhirQuestionnaireResponse } from "@/lib/screening/types";
import { scoreFromQuestionnaireResponse } from "@/lib/screening/score";
import { ResultDisplay } from "./result-display";

// Dynamic import — formbox uses browser APIs
const FhirRenderer = dynamic(() => import("./fhir-renderer"), { ssr: false });

interface QuestionnaireFlowProps {
  instrument: InstrumentMeta;
}

export function QuestionnaireFlow({ instrument }: QuestionnaireFlowProps) {
  const router = useRouter();
  const [latestResponse, setLatestResponse] =
    useState<FhirQuestionnaireResponse | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = useCallback((response: FhirQuestionnaireResponse) => {
    setLatestResponse(response);
  }, []);

  const handleSubmit = useCallback((response: FhirQuestionnaireResponse) => {
    setLatestResponse(response);
    setShowResults(true);
  }, []);

  const handleRestart = useCallback(() => {
    setLatestResponse(null);
    setShowResults(false);
  }, []);

  if (showResults && latestResponse) {
    try {
      const result = scoreFromQuestionnaireResponse(instrument, latestResponse);
      return (
        <ResultDisplay
          result={result}
          questionnaireResponse={latestResponse}
          onRestart={handleRestart}
          onFindProviders={() => router.push("/providers")}
        />
      );
    } catch {
      // If scoring fails, let user retry
      setShowResults(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Disclaimer */}
      <div className="mb-6 p-3 bg-warm-50 border border-warm-200 rounded-lg">
        <p className="text-xs text-warm-500">
          Your answers are completely private — they stay in your browser and
          are never stored or sent anywhere. This is a starting point, not a diagnosis.
        </p>
      </div>

      {/* FHIR Questionnaire Renderer */}
      <FhirRenderer
        questionnaire={instrument.questionnaire}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
