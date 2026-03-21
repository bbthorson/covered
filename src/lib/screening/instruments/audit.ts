import type { InstrumentMeta } from "../types";
import { choiceItem, calculatedScoreItem } from "../fhir-helpers";

const FREQ_5 = [
  { label: "Never", code: "never", weight: 0 },
  { label: "Less than monthly", code: "lt-monthly", weight: 1 },
  { label: "Monthly", code: "monthly", weight: 2 },
  { label: "Weekly", code: "weekly", weight: 3 },
  { label: "Daily or almost daily", code: "daily", weight: 4 },
];

const questionLinkIds = Array.from({ length: 10 }, (_, i) => `q${i + 1}`);

/**
 * AUDIT — Alcohol Use Disorders Identification Test
 *
 * Developed by the World Health Organization (WHO). 10 questions, scores 0–40.
 *
 * Citation: Saunders JB, Aasland OG, Babor TF, et al. Development of the AUDIT.
 * Addiction. 1993;88(6):791-804.
 */
export const audit: InstrumentMeta = {
  id: "audit",
  name: "AUDIT",
  fullName: "Alcohol Use Disorders Identification Test",
  description:
    "A 10-question screening tool developed by the World Health Organization to assess alcohol consumption, drinking behaviors, and alcohol-related problems.",
  citation:
    "Saunders JB, Aasland OG, Babor TF, et al. Development of the AUDIT. Addiction. 1993;88(6):791-804.",
  focus: "alcohol",
  questionCount: 10,
  maxScore: 40,
  scoringRanges: [
    {
      min: 0,
      max: 7,
      level: "low",
      label: "Low Risk",
      description:
        "Your responses suggest low-risk alcohol use. Continue to monitor your drinking habits.",
      recommendations: [
        "Continue practicing moderate drinking habits",
        "Be aware of situations that may lead to increased consumption",
        "Learn more about recommended drinking guidelines",
      ],
    },
    {
      min: 8,
      max: 15,
      level: "moderate",
      label: "Hazardous or Harmful Use",
      description:
        "Your responses suggest a pattern of drinking that may put you at risk for health problems. A brief intervention with a healthcare provider could be helpful.",
      recommendations: [
        "Consider speaking with a healthcare provider about your drinking",
        "Track your drinking patterns to better understand your habits",
        "Explore strategies to reduce your alcohol consumption",
        "Learn about the health effects of alcohol use",
      ],
    },
    {
      min: 16,
      max: 19,
      level: "high",
      label: "High Risk",
      description:
        "Your responses suggest a harmful pattern of alcohol use. A more thorough evaluation by a healthcare professional is recommended.",
      recommendations: [
        "Schedule an appointment with a healthcare provider for a full evaluation",
        "Consider contacting SAMHSA's helpline at 1-800-662-4357",
        "Look into local treatment options using our provider finder",
        "Talk to someone you trust about your concerns",
      ],
    },
    {
      min: 20,
      max: 40,
      level: "severe",
      label: "Possible Dependence",
      description:
        "Your responses suggest a pattern consistent with alcohol dependence. Professional evaluation and treatment are strongly recommended.",
      recommendations: [
        "Seek professional help — contact SAMHSA's helpline at 1-800-662-4357",
        "Use our provider finder to locate treatment facilities near you",
        "Do not attempt to stop drinking suddenly without medical supervision, as withdrawal can be dangerous",
        "If you are in crisis, call 988 (Suicide & Crisis Lifeline)",
        "Talk to a trusted person about getting support",
      ],
    },
  ],
  questionnaire: {
    resourceType: "Questionnaire",
    id: "audit",
    url: "https://covered.app/fhir/Questionnaire/audit",
    status: "active",
    title: "Alcohol Use Disorders Identification Test (AUDIT)",
    description:
      "WHO screening tool for alcohol use disorders. 10 questions, scores 0–40.",
    item: [
      choiceItem("q1", "How often do you have a drink containing alcohol?", [
        { label: "Never", code: "never", weight: 0 },
        { label: "Monthly or less", code: "monthly-or-less", weight: 1 },
        { label: "2–4 times a month", code: "2-4-monthly", weight: 2 },
        { label: "2–3 times a week", code: "2-3-weekly", weight: 3 },
        { label: "4 or more times a week", code: "4-plus-weekly", weight: 4 },
      ]),
      choiceItem(
        "q2",
        "How many drinks containing alcohol do you have on a typical day when you are drinking?",
        [
          { label: "1 or 2", code: "1-2", weight: 0 },
          { label: "3 or 4", code: "3-4", weight: 1 },
          { label: "5 or 6", code: "5-6", weight: 2 },
          { label: "7 to 9", code: "7-9", weight: 3 },
          { label: "10 or more", code: "10-plus", weight: 4 },
        ]
      ),
      choiceItem(
        "q3",
        "How often do you have 6 or more drinks on one occasion?",
        FREQ_5
      ),
      choiceItem(
        "q4",
        "How often during the last year have you found that you were not able to stop drinking once you had started?",
        FREQ_5
      ),
      choiceItem(
        "q5",
        "How often during the last year have you failed to do what was normally expected of you because of drinking?",
        FREQ_5
      ),
      choiceItem(
        "q6",
        "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
        FREQ_5
      ),
      choiceItem(
        "q7",
        "How often during the last year have you had a feeling of guilt or remorse after drinking?",
        FREQ_5
      ),
      choiceItem(
        "q8",
        "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
        FREQ_5
      ),
      choiceItem(
        "q9",
        "Have you or someone else been injured because of your drinking?",
        [
          { label: "No", code: "no", weight: 0 },
          { label: "Yes, but not in the last year", code: "yes-not-recent", weight: 2 },
          { label: "Yes, during the last year", code: "yes-recent", weight: 4 },
        ]
      ),
      choiceItem(
        "q10",
        "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
        [
          { label: "No", code: "no", weight: 0 },
          { label: "Yes, but not in the last year", code: "yes-not-recent", weight: 2 },
          { label: "Yes, during the last year", code: "yes-recent", weight: 4 },
        ]
      ),
      calculatedScoreItem("total-score", "Total Score", questionLinkIds),
    ],
  },
};
