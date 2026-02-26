import { FaIdCard } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function StudentInfoFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <FieldGroup label="Full Name" htmlFor="studentName">
        <FieldControl icon={<BsPersonFill />}>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={inputData.studentName}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
            required
          />
        </FieldControl>
      </FieldGroup>

      <FieldGroup label="Student ID" htmlFor="studentId">
        <FieldControl icon={<FaIdCard />}>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={inputData.studentId}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your ID"
            required
          />
        </FieldControl>
      </FieldGroup>
    </div>
  );
}
