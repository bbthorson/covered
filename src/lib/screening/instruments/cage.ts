import type { InstrumentMeta } from "../types";
import { choiceItem, calculatedScoreItem } from "../fhir-helpers";

const YES_NO = [
  { label: "No", code: "no", weight: 0 },
  { label: "Yes", code: "yes", weight: 1 },
];

const questionLinkIds = ["q1", "q2", "q3", "q4"];

/**
 * CAGE — CAGE Questionnaire
 *
 * Developed by John Ewing, MD. 4 yes/no questions, scores 0–4.
 * Named after: Cut down, Annoyed, Guilty, Eye-opener.
 *
 * Citation: Ewing JA. Detecting Alcoholism: The CAGE Questionnaire. JAMA.
 * 1984;252(14):1905-1907.
 */
export const cage: InstrumentMeta = {
  id: "cage",
  name: "CAGE",
  fullName: "CAGE Questionnaire",
  description:
    "A quick 4-question screening tool widely used to identify problems with alcohol use. Named after its four questions: Cut down, Annoyed, Guilty, Eye-opener.",
  citation:
    "Ewing JA. Detecting Alcoholism: The CAGE Questionnaire. JAMA. 1984;252(14):1905-1907.",
  focus: "alcohol",
  questionCount: 4,
  maxScore: 4,
  scoringRanges: [
    {
      min: 0,
      max: 1,
      level: "low",
      label: "Low Concern",
      description:
        'Your responses do not indicate a significant concern for alcohol problems, though any "yes" answer warrants attention.',
      recommendations: [
        "Continue to monitor your drinking habits",
        "Be aware of changes in your drinking patterns",
        "Learn about recommended drinking guidelines",
      ],
    },
    {
      min: 2,
      max: 3,
      level: "moderate",
      label: "Clinical Concern",
      description:
        "A score of 2 or more on the CAGE is considered clinically significant and suggests a possible alcohol problem. Further evaluation is recommended.",
      recommendations: [
        "Schedule an appointment with a healthcare provider for a full evaluation",
        "Consider contacting SAMHSA's helpline at 1-800-662-4357",
        "Explore treatment options using our provider finder",
        "Talk to someone you trust about your concerns",
      ],
    },
    {
      min: 4,
      max: 4,
      level: "high",
      label: "High Concern",
      description:
        "A score of 4 on the CAGE strongly suggests an alcohol problem. Professional evaluation and treatment are recommended.",
      recommendations: [
        "Seek professional help — contact SAMHSA's helpline at 1-800-662-4357",
        "Use our provider finder to locate treatment facilities near you",
        "Do not attempt to stop drinking suddenly without medical supervision",
        "If you are in crisis, call 988 (Suicide & Crisis Lifeline)",
        "Talk to a trusted person about getting support",
      ],
    },
  ],
  questionnaire: {
    resourceType: "Questionnaire",
    id: "cage",
    url: "https://covered.app/fhir/Questionnaire/cage",
    status: "active",
    title: "CAGE Questionnaire",
    description:
      "4-question alcohol screening. Named after: Cut down, Annoyed, Guilty, Eye-opener. Scores 0–4.",
    item: [
      choiceItem(
        "q1",
        "Have you ever felt you should Cut down on your drinking?",
        YES_NO
      ),
      choiceItem(
        "q2",
        "Have people Annoyed you by criticizing your drinking?",
        YES_NO
      ),
      choiceItem(
        "q3",
        "Have you ever felt bad or Guilty about your drinking?",
        YES_NO
      ),
      choiceItem(
        "q4",
        "Have you ever had a drink first thing in the morning to steady your nerves or get rid of a hangover (Eye-opener)?",
        YES_NO
      ),
      calculatedScoreItem("total-score", "Total Score", questionLinkIds),
    ],
  },
};
