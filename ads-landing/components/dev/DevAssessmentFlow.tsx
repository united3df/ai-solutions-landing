"use client";

import { useAssessmentStore } from "@/lib/assessment/assessment-store";
import { DevAssessmentAnalyzing } from "./DevAssessmentAnalyzing";
import { DevAssessmentQuestions } from "./DevAssessmentQuestions";
import { DevAssessmentResults } from "./DevAssessmentResults";

export function DevAssessmentFlow() {
  const step = useAssessmentStore((s) => s.step);

  return (
    <div className="bg-dev-bg py-16 md:py-20">
      {step === "questions" && <DevAssessmentQuestions />}
      {step === "analyzing" && <DevAssessmentAnalyzing />}
      {step === "results" && <DevAssessmentResults />}
    </div>
  );
}
