import { MdDateRange } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { SelectField } from "./field-primitives";

export function SemesterField({ inputData, onChange }: BasicFieldProps) {
  const currentYear = new Date().getFullYear();

  return (
    <SelectField
      label="Semester"
      htmlFor="semester"
      name="semester"
      value={inputData.semester}
      onChange={onChange}
      icon={<MdDateRange />}
      required
    >
      <option value="">Select Semester</option>
      <option value={`Spring ${currentYear}`}>Spring {currentYear}</option>
      <option value={`Summer ${currentYear}`}>Summer {currentYear}</option>
      <option value={`Fall ${currentYear}`}>Fall {currentYear}</option>
    </SelectField>
  );
}
