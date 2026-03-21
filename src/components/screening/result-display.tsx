import type { ScreeningResult, RiskLevel, FhirQuestionnaireResponse } from "@/lib/screening/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface ResultDisplayProps {
  result: ScreeningResult;
  questionnaireResponse?: FhirQuestionnaireResponse;
  onRestart: () => void;
  onFindProviders: () => void;
}

const levelConfig: Record<
  RiskLevel,
  { color: string; bgColor: string; badgeVariant: "default" | "primary" | "outline" | "crisis"; icon: typeof CheckCircle }
> = {
  low: {
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    badgeVariant: "default",
    icon: CheckCircle,
  },
  moderate: {
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    badgeVariant: "primary",
    icon: AlertTriangle,
  },
  high: {
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    badgeVariant: "crisis",
    icon: AlertTriangle,
  },
  severe: {
    color: "text-crisis-700",
    bgColor: "bg-red-50 border-red-200",
    badgeVariant: "crisis",
    icon: AlertTriangle,
  },
};

export function ResultDisplay({
  result,
  questionnaireResponse,
  onRestart,
  onFindProviders,
}: ResultDisplayProps) {
  const config = levelConfig[result.level];
  const Icon = config.icon;
  const showCrisisResources = result.level === "high" || result.level === "severe";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Disclaimer */}
      <div className="p-4 bg-warm-50 border border-warm-200 rounded-lg">
        <p className="text-sm text-warm-600">
          <strong>Important:</strong> This screening result is not a diagnosis.
          It is a tool to help you understand your situation and decide on next
          steps. Please consult a qualified healthcare provider for professional
          evaluation and advice.
        </p>
      </div>

      {/* Crisis resources if high/severe */}
      {showCrisisResources && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-crisis-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-crisis-700">
                If you are in crisis or need immediate help:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-crisis-700">
                <li>
                  Call{" "}
                  <a href="tel:988" className="font-bold underline">
                    988
                  </a>{" "}
                  (Suicide &amp; Crisis Lifeline)
                </li>
                <li>
                  Call{" "}
                  <a href="tel:1-800-662-4357" className="font-bold underline">
                    1-800-662-4357
                  </a>{" "}
                  (SAMHSA Helpline — free, 24/7)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Result card */}
      <Card className={`border ${config.bgColor}`}>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Icon className={`h-8 w-8 ${config.color} shrink-0 mt-1`} aria-hidden="true" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className={`text-xl font-bold ${config.color}`}>
                  {result.label}
                </h2>
                <Badge variant={config.badgeVariant}>
                  {result.totalScore} / {result.maxPossibleScore}
                </Badge>
              </div>
              <p className="text-warm-700">{result.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-warm-900 mb-4">
            Recommended Next Steps
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <ArrowRight className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-sm text-warm-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onFindProviders} className="flex-1">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Find Treatment Providers
        </Button>
        <Link href="/learn" className="flex-1">
          <Button variant="outline" className="w-full">
            Learn More About Treatment
          </Button>
        </Link>
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retake
        </Button>
      </div>

      {/* FHIR QuestionnaireResponse (for EHR integration) */}
      {questionnaireResponse && (
        <details className="mt-4">
          <summary className="text-xs text-warm-400 cursor-pointer hover:text-warm-600">
            View FHIR QuestionnaireResponse (for EHR integration)
          </summary>
          <pre className="mt-2 p-4 bg-warm-50 border border-warm-200 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify(questionnaireResponse, null, 2)}
          </pre>
        </details>
      )}

      {/* Citation */}
      <p className="text-xs text-warm-400 text-center">
        Screening instrument: {result.instrumentName}
      </p>
    </div>
  );
}
