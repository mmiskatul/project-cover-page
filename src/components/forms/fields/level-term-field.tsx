import { FaGraduationCap } from "react-icons/fa";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function LevelTermField({ inputData, onChange }: BasicFieldProps) {
  return (
    <TextInputField
      label="Level-Term"
      htmlFor="level"
      name="level"
      value={inputData.level}
      onChange={onChange}
      icon={<FaGraduationCap />}
      placeholder="Enter level-term"
      required
    />
  );
}
