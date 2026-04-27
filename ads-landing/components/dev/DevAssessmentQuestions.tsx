"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAssessmentStore } from "@/lib/assessment/assessment-store";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment/assessment-data";

const optionBase =
  "flex w-full items-center gap-3 rounded-xl border-2 bg-dev-s3 px-5 py-4 text-left text-[15px] transition-all text-dev-text";
const optionIdle = "border-[color:var(--color-dev-border-strong)] hover:border-[rgba(198,241,53,0.35)]";
const optionSelected = "border-dev-accent bg-[rgba(198,241,53,0.08)]";

export function DevAssessmentQuestions() {
  const {
    currentQuestionIndex,
    answers,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    calculateResults,
  } = useAssessmentStore();

  const question = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers.find((a) => a.questionId === question.id);
  const progress = Math.round((currentQuestionIndex / ASSESSMENT_QUESTIONS.length) * 100);
  const isLastQuestion = currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    answerQuestion(question.id, optionIndex);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
        Step 2 · Quick assessment
      </p>
      <h3 className="mb-10 text-center font-[var(--font-dev-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.98] tracking-[0.03em] text-dev-text">
        Automation readiness
      </h3>

      <div className="rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-bg p-8 md:p-12">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-dev-border)]">
          <div
            className="h-full rounded-full bg-dev-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mb-10 text-center text-[0.83rem] text-dev-muted">
          Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
        </p>

        <h4 className="mb-7 font-[var(--font-dev-display)] text-xl font-semibold leading-relaxed tracking-[0.02em] text-dev-text">
          {currentQuestionIndex + 1}. {question.question}
        </h4>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const selected = currentAnswer?.value === index;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleOptionSelect(index)}
                className={`${optionBase} ${selected ? optionSelected : optionIdle}`}
              >
                <span
                  className={`h-[18px] w-[18px] shrink-0 rounded-full border-2 transition-colors ${
                    selected
                      ? "border-dev-accent bg-dev-accent"
                      : "border-[color:var(--color-dev-border-strong)] bg-transparent"
                  }`}
                />
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={prevQuestion}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[color:var(--color-dev-border-strong)] bg-transparent px-8 text-[0.95rem] font-medium text-dev-text transition-colors hover:border-dev-accent hover:text-dev-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-dev-accent px-10 text-[0.95rem] font-bold text-[#080809] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isLastQuestion ? "See results" : "Continue"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
