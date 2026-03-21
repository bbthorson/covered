import { describe, it, expect } from "vitest";
import { scoreFromTotal, scoreFromQuestionnaireResponse } from "./score";
import { audit } from "./instruments/audit";
import { dast10 } from "./instruments/dast10";
import { cage } from "./instruments/cage";
import type { FhirQuestionnaireResponse } from "./types";

describe("scoreFromTotal", () => {
  describe("AUDIT", () => {
    it("scores 0 as low risk", () => {
      const result = scoreFromTotal(audit, 0);
      expect(result.level).toBe("low");
      expect(result.totalScore).toBe(0);
      expect(result.maxPossibleScore).toBe(40);
    });

    it("scores 7 as low risk (boundary)", () => {
      expect(scoreFromTotal(audit, 7).level).toBe("low");
    });

    it("scores 8 as moderate (boundary)", () => {
      expect(scoreFromTotal(audit, 8).level).toBe("moderate");
    });

    it("scores 15 as moderate", () => {
      expect(scoreFromTotal(audit, 15).level).toBe("moderate");
    });

    it("scores 16 as high risk", () => {
      expect(scoreFromTotal(audit, 16).level).toBe("high");
    });

    it("scores 19 as high risk (boundary)", () => {
      expect(scoreFromTotal(audit, 19).level).toBe("high");
    });

    it("scores 20 as severe", () => {
      expect(scoreFromTotal(audit, 20).level).toBe("severe");
    });

    it("scores 40 as severe (max)", () => {
      expect(scoreFromTotal(audit, 40).level).toBe("severe");
    });
  });

  describe("DAST-10", () => {
    it("scores 0 as low (no problems)", () => {
      expect(scoreFromTotal(dast10, 0).level).toBe("low");
      expect(scoreFromTotal(dast10, 0).label).toBe("No Problems Reported");
    });

    it("scores 1-2 as low", () => {
      expect(scoreFromTotal(dast10, 1).level).toBe("low");
      expect(scoreFromTotal(dast10, 2).level).toBe("low");
    });

    it("scores 3-5 as moderate", () => {
      expect(scoreFromTotal(dast10, 3).level).toBe("moderate");
      expect(scoreFromTotal(dast10, 5).level).toBe("moderate");
    });

    it("scores 6-8 as high", () => {
      expect(scoreFromTotal(dast10, 6).level).toBe("high");
      expect(scoreFromTotal(dast10, 8).level).toBe("high");
    });

    it("scores 9-10 as severe", () => {
      expect(scoreFromTotal(dast10, 9).level).toBe("severe");
      expect(scoreFromTotal(dast10, 10).level).toBe("severe");
    });
  });

  describe("CAGE", () => {
    it("scores 0-1 as low", () => {
      expect(scoreFromTotal(cage, 0).level).toBe("low");
      expect(scoreFromTotal(cage, 1).level).toBe("low");
    });

    it("scores 2-3 as moderate (clinical concern)", () => {
      expect(scoreFromTotal(cage, 2).level).toBe("moderate");
      expect(scoreFromTotal(cage, 3).level).toBe("moderate");
    });

    it("scores 4 as high", () => {
      expect(scoreFromTotal(cage, 4).level).toBe("high");
    });
  });

  it("throws for out-of-range score", () => {
    expect(() => scoreFromTotal(audit, -1)).toThrow("No scoring range");
    expect(() => scoreFromTotal(audit, 41)).toThrow("No scoring range");
  });
});

describe("scoreFromQuestionnaireResponse", () => {
  it("scores a CAGE QuestionnaireResponse correctly", () => {
    const response: FhirQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      item: [
        { linkId: "q1", answer: [{ valueCoding: { code: "yes", display: "Yes" } }] },
        { linkId: "q2", answer: [{ valueCoding: { code: "yes", display: "Yes" } }] },
        { linkId: "q3", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q4", answer: [{ valueCoding: { code: "no", display: "No" } }] },
      ],
    };
    const result = scoreFromQuestionnaireResponse(cage, response);
    expect(result.totalScore).toBe(2);
    expect(result.level).toBe("moderate");
  });

  it("scores an all-No CAGE response as 0", () => {
    const response: FhirQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      item: [
        { linkId: "q1", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q2", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q3", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q4", answer: [{ valueCoding: { code: "no", display: "No" } }] },
      ],
    };
    const result = scoreFromQuestionnaireResponse(cage, response);
    expect(result.totalScore).toBe(0);
    expect(result.level).toBe("low");
  });

  it("handles DAST-10 reverse-scored Q3", () => {
    // Q3 "Always able to stop?" — No = weight 1, Yes = weight 0
    const response: FhirQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      item: [
        { linkId: "q1", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q2", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q3", answer: [{ valueCoding: { code: "no", display: "No" } }] }, // weight=1
        { linkId: "q4", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q5", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q6", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q7", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q8", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q9", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q10", answer: [{ valueCoding: { code: "no", display: "No" } }] },
      ],
    };
    const result = scoreFromQuestionnaireResponse(dast10, response);
    // Only Q3 contributes 1 (reverse scored), rest are 0
    expect(result.totalScore).toBe(1);
    expect(result.level).toBe("low");
  });

  it("throws on missing answers", () => {
    const response: FhirQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      item: [
        { linkId: "q1", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        // Missing q2, q3, q4
      ],
    };
    expect(() => scoreFromQuestionnaireResponse(cage, response)).toThrow("Missing answer");
  });

  it("throws on invalid answer code", () => {
    const response: FhirQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      item: [
        { linkId: "q1", answer: [{ valueCoding: { code: "invalid", display: "?" } }] },
        { linkId: "q2", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q3", answer: [{ valueCoding: { code: "no", display: "No" } }] },
        { linkId: "q4", answer: [{ valueCoding: { code: "no", display: "No" } }] },
      ],
    };
    expect(() => scoreFromQuestionnaireResponse(cage, response)).toThrow("Invalid answer code");
  });
});
