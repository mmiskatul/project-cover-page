import type { SweCriteriaRow } from "@/components/forms/types";

export const SWE_EVALUATION_DEFAULTS: Record<
  string,
  { totalMark: string; rows: SweCriteriaRow[] }
> = {
  theory: {
    totalMark: "5",
    rows: [
      { label: "Clarity", mark: "1" },
      { label: "Content Quality", mark: "2" },
      { label: "Spelling & Grammar", mark: "1" },
      { label: "Organization and Formatting", mark: "1" },
    ],
  },
  "lab assignment": {
    totalMark: "10",
    rows: [
      { label: "Clarity", mark: "2" },
      { label: "Content Quality", mark: "4" },
      { label: "Spelling & Grammar", mark: "2" },
      { label: "Organization and Formatting", mark: "2" },
    ],
  },
  "lab report": {
    totalMark: "25",
    rows: [
      { label: "Understanding", mark: "3" },
      { label: "Analysis", mark: "4" },
      { label: "Implementation", mark: "8" },
      { label: "Report Writing", mark: "10" },
    ],
  },
  "lab final": {
    totalMark: "40",
    rows: [
      { label: "Understanding/Analysis", mark: "10" },
      { label: "Implementation", mark: "15" },
      { label: "Accuracy", mark: "10" },
      { label: "Task Efficiency", mark: "5" },
    ],
  },
  project: {
    totalMark: "25",
    rows: [
      { label: "Problem Understanding", mark: "7" },
      { label: "Implementation", mark: "8" },
      { label: "Report Writing", mark: "10" },
    ],
  },
  thesis: {
    totalMark: "100",
    rows: [
      { label: "Understanding/Analysis", mark: "25" },
      { label: "Implementation", mark: "35" },
      { label: "Accuracy", mark: "25" },
      { label: "Report Writing", mark: "15" },
    ],
  },
};

export function getDefaultSweEvaluation(courseType?: string | null) {
  return SWE_EVALUATION_DEFAULTS[courseType || "theory"] || SWE_EVALUATION_DEFAULTS.theory;
}

export function cloneSweCriteriaRows(rows: SweCriteriaRow[]) {
  return rows.map((row) => ({ ...row }));
}

export function createEmptySweCriteriaRows(rows: SweCriteriaRow[]) {
  return rows.map((_, i) => ({
    id: `swe-row-${i}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    label: "",
    mark: "",
  }));
}
