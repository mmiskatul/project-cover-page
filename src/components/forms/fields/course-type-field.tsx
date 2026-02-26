import { MdMenuBook } from "react-icons/md";
import { COURSE_TYPE_OPTIONS } from "@/components/forms/constants";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function CourseTypeField({ inputData, onChange }: BasicFieldProps) {
  return (
    <FieldGroup label="Course Type" htmlFor="courseType">
      <FieldControl icon={<MdMenuBook />}>
        <select
          id="courseType"
          name="courseType"
          value={inputData.courseType}
          onChange={onChange}
          className="h-full px-2 w-full outline-none bg-transparent"
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
        </select>
      </FieldControl>
    </FieldGroup>
  );
}
