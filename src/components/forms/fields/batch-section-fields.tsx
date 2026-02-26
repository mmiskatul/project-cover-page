import { MdOutlineGroups } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function BatchSectionFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <TextInputField
        label="Batch"
        htmlFor="batch"
        name="batch"
        value={inputData.batch}
        onChange={onChange}
        icon={<MdOutlineGroups />}
        placeholder="Enter your batch"
        required
      />

      <TextInputField
        label="Section"
        htmlFor="section"
        name="section"
        value={inputData.section}
        onChange={onChange}
        icon={<PiNotebookFill />}
        placeholder="Enter your section"
        required
      />
    </div>
  );
}
