import { FaIdCard } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function StudentInfoFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <TextInputField
        label="Full Name"
        htmlFor="studentName"
        name="studentName"
        value={inputData.studentName}
        onChange={onChange}
        icon={<BsPersonFill />}
        placeholder="Enter your full name"
        required
      />

      <TextInputField
        label="Student ID"
        htmlFor="studentId"
        name="studentId"
        value={inputData.studentId}
        onChange={onChange}
        icon={<FaIdCard />}
        placeholder="Enter your ID"
        required
      />
    </div>
  );
}
