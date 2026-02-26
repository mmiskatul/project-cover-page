import { FaIdCard } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function CourseFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <TextInputField
        label="Course Name"
        htmlFor="courseName"
        name="courseName"
        value={inputData.courseName}
        onChange={onChange}
        icon={<MdLibraryBooks />}
        placeholder="Enter course name"
        required
      />

      <TextInputField
        label="Course ID"
        htmlFor="courseId"
        name="courseId"
        value={inputData.courseId}
        onChange={onChange}
        icon={<FaIdCard />}
        placeholder="Enter course ID"
        required
      />
    </div>
  );
}
