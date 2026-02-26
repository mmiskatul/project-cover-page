import { MdApartment } from "react-icons/md";
import { DEPARTMENT_GROUPS } from "@/components/forms/constants";
import type { BasicFieldProps } from "@/components/forms/types";
import { SelectField } from "./field-primitives";

export function DepartmentField({ inputData, onChange }: BasicFieldProps) {
  return (
    <SelectField
      label="Department"
      htmlFor="department"
      name="department"
      value={inputData.department}
      onChange={onChange}
      icon={<MdApartment className="text-xl" />}
      required
    >
      <option value="" disabled>
        Select Department
      </option>
      {DEPARTMENT_GROUPS.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      ))}
    </SelectField>
  );
}
