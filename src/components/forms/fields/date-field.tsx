import { MdDateRange } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function DateField({ inputData, onChange }: BasicFieldProps) {
  return (
    <FieldGroup label="Select Date" htmlFor="date">
      <FieldControl icon={<MdDateRange />} className="bg-white">
        <input
          type="date"
          id="date"
          name="date"
          value={inputData.date}
          onChange={onChange}
          className="w-full h-full bg-transparent outline-none px-2"
        />
      </FieldControl>
    </FieldGroup>
  );
}
