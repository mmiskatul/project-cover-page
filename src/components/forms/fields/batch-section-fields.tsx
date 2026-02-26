import { MdOutlineGroups } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function BatchSectionFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <FieldGroup label="Batch" htmlFor="batch">
        <FieldControl icon={<MdOutlineGroups />}>
          <input
            type="text"
            id="batch"
            name="batch"
            value={inputData.batch}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your batch"
            required
          />
        </FieldControl>
      </FieldGroup>

      <FieldGroup label="Section" htmlFor="section">
        <FieldControl icon={<PiNotebookFill />}>
          <input
            type="text"
            id="section"
            name="section"
            value={inputData.section}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your section"
            required
          />
        </FieldControl>
      </FieldGroup>
    </div>
  );
}
