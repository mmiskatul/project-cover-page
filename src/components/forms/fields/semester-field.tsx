import { MdDateRange } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function SemesterField({ inputData, onChange }: BasicFieldProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <TextInputField
        label="Semester"
        htmlFor="semester"
        name="semester"
        value={inputData.semester}
        onChange={onChange}
        icon={<MdDateRange />}
        placeholder="Select or type semester (e.g. Spring 2025)"
        required
        list="semester-options-list"
      />
      <datalist id="semester-options-list">
        <option value={`Spring ${currentYear}`} />
        <option value={`Summer ${currentYear}`} />
        <option value={`Fall ${currentYear}`} />
        <option value={`Spring ${currentYear - 1}`} />
        <option value={`Fall ${currentYear - 1}`} />
      </datalist>
    </div>
  );
}
