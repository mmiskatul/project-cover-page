import { MdDateRange } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function DateField({ inputData, onChange }: BasicFieldProps) {
  return (
    <TextInputField
      label="Select Date"
      htmlFor="date"
      name="date"
      type="date"
      value={inputData.date}
      onChange={onChange}
      icon={<MdDateRange />}
      controlClassName="bg-white"
      inputClassName="w-full h-full bg-transparent outline-none px-2"
    />
  );
}
