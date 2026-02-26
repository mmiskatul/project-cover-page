import { MdApartment } from "react-icons/md";
import { DEPARTMENT_GROUPS } from "@/components/forms/constants";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function DepartmentField({ inputData, onChange }: BasicFieldProps) {
  return (
    <FieldGroup label="Department" htmlFor="department">
      <FieldControl icon={<MdApartment className="text-xl" />}>
        <select
          id="department"
          name="department"
          value={inputData.department}
          onChange={onChange}
          className="h-full px-2 w-full outline-none bg-transparent"
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
        </select>
      </FieldControl>
    </FieldGroup>
  );
}
