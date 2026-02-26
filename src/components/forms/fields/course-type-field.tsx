import { MdMenuBook } from "react-icons/md";
import { COURSE_TYPE_OPTIONS } from "@/components/forms/constants";
import type { BasicFieldProps } from "@/components/forms/types";
import { SelectField } from "./field-primitives";

export function CourseTypeField({ inputData, onChange }: BasicFieldProps) {
  return (
    <SelectField
      label="Course Type"
      htmlFor="courseType"
      name="courseType"
      value={inputData.courseType}
      onChange={onChange}
      icon={<MdMenuBook />}
      required
    >
      <option value="" disabled>
        Select course type
      </option>
      {COURSE_TYPE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectField>
  );
}
