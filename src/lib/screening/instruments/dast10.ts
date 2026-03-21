import type { InstrumentMeta } from "../types";
import { choiceItem, calculatedScoreItem } from "../fhir-helpers";

const YES_NO = [
  { label: "No", code: "no", weight: 0 },
  { label: "Yes", code: "yes", weight: 1 },
];

// Question 3 is reverse-scored: "Are you always able to stop?" Yes=0, No=1
const YES_NO_REVERSE = [
  { label: "No", code: "no", weight: 1 },
  { label: "Yes", code: "yes", weight: 0 },
];

const questionLinkIds = Array.from({ length: 10 }, (_, i) => `q${i + 1}`);

/**
 * DAST-10 — Drug Abuse Screening Test (10-item version)
 *
 * Developed by Harvey A. Skinner, PhD. 10 yes/no questions, scores 0–10.
 *
 * Citation: Skinner HA. The Drug Abuse Screening Test. Addictive Behaviors.
 * 1982;7(4):363-371.
 */
export const dast10: InstrumentMeta = {
  id: "dast10",
  name: "DAST-10",
  fullName: "Drug Abuse Screening Test",
  description:
    "A 10-question screening tool that assesses drug use (excluding alcohol and tobacco) over the past 12 months.",
  citation:
    "Skinner HA. The Drug Abuse Screening Test. Addictive Behaviors. 1982;7(4):363-371.",
  focus: "drugs",
  questionCount: 10,
  maxScore: 10,
  scoringRanges: [
    {
      min: 0,
      max: 0,
      level: "low",
      label: "No Problems Reported",
      description:
        "Your responses do not indicate any drug-related problems.",
      recommendations: [
        "Continue to avoid non-medical drug use",
        "Be aware of the risks of drug use",
      ],
    },
    {
      min: 1,
      max: 2,
      level: "low",
      label: "Low Level",
      description:
        "Your responses suggest a low level of drug-related problems. Monitoring and education are recommended.",
      recommendations: [
        "Learn more about the risks associated with drug use",
        "Consider discussing your drug use with a healthcare provider",
        "Monitor your usage patterns",
      ],
    },
    {
      min: 3,
      max: 5,
      level: "moderate",
      label: "Moderate Level",
      description:
        "Your responses suggest a moderate level of drug-related problems. Further evaluation is recommended.",
      recommendations: [
        "Schedule an appointment with a healthcare provider for evaluation",
        "Consider contacting SAMHSA's helpline at 1-800-662-4357",
        "Learn about treatment options available to you",
        "Talk to someone you trust about your concerns",
      ],
    },
    {
      min: 6,
      max: 8,
      level: "high",
      label: "Substantial Level",
      description:
        "Your responses suggest a substantial level of drug-related problems. Intensive assessment and treatment are recommended.",
      recommendations: [
        "Seek professional evaluation as soon as possible",
        "Contact SAMHSA's helpline at 1-800-662-4357",
        "Use our provider finder to locate treatment facilities near you",
        "Talk to a trusted person about getting support",
      ],
    },
    {
      min: 9,
      max: 10,
      level: "severe",
      label: "Severe Level",
      description:
        "Your responses suggest a severe level of drug-related problems. Immediate intensive assessment and treatment are strongly recommended.",
      recommendations: [
        "Seek professional help immediately — contact SAMHSA's helpline at 1-800-662-4357",
        "Use our provider finder to locate treatment facilities near you",
        "If you are in crisis, call 988 (Suicide & Crisis Lifeline)",
        "Do not stop using substances suddenly without medical supervision",
        "Talk to a trusted person about getting support",
      ],
    },
  ],
  questionnaire: {
    resourceType: "Questionnaire",
    id: "dast10",
    url: "https://covered.app/fhir/Questionnaire/dast10",
    status: "active",
    title: "Drug Abuse Screening Test (DAST-10)",
    description:
      "10-item screening for drug use problems (excluding alcohol and tobacco). Scores 0–10.",
    item: [
      choiceItem(
        "q1",
        "Have you used drugs other than those required for medical reasons?",
        YES_NO
      ),
      choiceItem("q2", "Do you abuse more than one drug at a time?", YES_NO),
      choiceItem(
        "q3",
        "Are you always able to stop using drugs when you want to?",
        YES_NO_REVERSE
      ),
      choiceItem(
        "q4",
        "Have you had blackouts or flashbacks as a result of drug use?",
        YES_NO
      ),
      choiceItem(
        "q5",
        "Do you ever feel bad or guilty about your drug use?",
        YES_NO
      ),
      choiceItem(
        "q6",
        "Does your spouse (or parents) ever complain about your involvement with drugs?",
        YES_NO
      ),
      choiceItem(
        "q7",
        "Have you neglected your family because of your use of drugs?",
        YES_NO
      ),
      choiceItem(
        "q8",
        "Have you engaged in illegal activities in order to obtain drugs?",
        YES_NO
      ),
      choiceItem(
        "q9",
        "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
        YES_NO
      ),
      choiceItem(
        "q10",
        "Have you had medical problems as a result of your drug use (e.g., memory loss, hepatitis, convulsions, bleeding)?",
        YES_NO
      ),
      calculatedScoreItem("total-score", "Total Score", questionLinkIds),
    ],
  },
};
