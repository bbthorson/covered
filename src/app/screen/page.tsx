import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Check In",
  description:
    "Free, private screenings to help you understand your relationship with alcohol and substances. No data stored, no sign-up needed.",
};

const instruments = [
  {
    id: "audit",
    name: "AUDIT",
    fullName: "Alcohol Use Disorders Identification Test",
    description:
      "10 questions about your drinking patterns — how often, how much, and how it affects your life. Developed by the World Health Organization.",
    questionCount: 10,
    timeEstimate: "2-3 minutes",
    focus: "Alcohol",
  },
  {
    id: "dast10",
    name: "DAST-10",
    fullName: "Drug Abuse Screening Test",
    description:
      "10 questions about your experience with drugs (not including alcohol or tobacco) over the past year.",
    questionCount: 10,
    timeEstimate: "2-3 minutes",
    focus: "Drugs",
  },
  {
    id: "cage",
    name: "CAGE",
    fullName: "CAGE Questionnaire",
    description:
      "Just 4 questions. A quick way to reflect on your relationship with alcohol. Named after its themes: Cut down, Annoyed, Guilty, Eye-opener.",
    questionCount: 4,
    timeEstimate: "1 minute",
    focus: "Alcohol",
  },
];

export default function ScreenPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">
          Check In With Yourself
        </h1>
        <p className="mt-4 text-lg text-warm-500">
          These quick, private screenings can help you get a clearer picture of
          where you stand. Your answers stay in your browser — we never see
          them.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-warm-50 border border-warm-200 rounded-lg">
        <p className="text-sm text-warm-600">
          <strong>A note:</strong> These screenings are a starting point, not a
          diagnosis. They can help you reflect and decide if you want to talk to
          someone — but they don&apos;t replace a conversation with a healthcare
          provider.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {instruments.map((instrument) => (
          <Card key={instrument.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary">{instrument.focus}</Badge>
                <Badge variant="outline">{instrument.questionCount} questions</Badge>
              </div>
              <CardTitle className="text-xl">{instrument.name}</CardTitle>
              <CardDescription className="text-xs">
                {instrument.fullName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-warm-600">{instrument.description}</p>
              <p className="mt-3 text-xs text-warm-400">
                Takes about {instrument.timeEstimate}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/screen/${instrument.id}`} className="w-full">
                <Button className="w-full justify-between">
                  Start {instrument.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
