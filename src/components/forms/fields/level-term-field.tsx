import { FaGraduationCap } from "react-icons/fa";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function LevelTermField({ inputData, onChange }: BasicFieldProps) {
  return (
    <FieldGroup label="Level-Term" htmlFor="level">
      <FieldControl icon={<FaGraduationCap />}>
        <input
          type="text"
          id="level"
          name="level"
          value={inputData.level}
          onChange={onChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          placeholder="Enter level-term"
          required
        />
      </FieldControl>
    </FieldGroup>
  );
}
