import { MdDateRange } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function SemesterField({ inputData, onChange }: BasicFieldProps) {
  const currentYear = new Date().getFullYear();

  return (
    <FieldGroup label="Semester" htmlFor="semester">
      <FieldControl icon={<MdDateRange />}>
        <select
          id="semester"
          name="semester"
          value={inputData.semester}
          onChange={onChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          required
        >
          <option value="">Select Semester</option>
          <option value={`Spring ${currentYear}`}>Spring {currentYear}</option>
          <option value={`Summer ${currentYear}`}>Summer {currentYear}</option>
          <option value={`Fall ${currentYear}`}>Fall {currentYear}</option>
        </select>
      </FieldControl>
    </FieldGroup>
  );
}
