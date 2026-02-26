import { FaIdCard } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function CourseFields({ inputData, onChange }: BasicFieldProps) {
  return (
    <div>
      <FieldGroup label="Course Name" htmlFor="courseName">
        <FieldControl icon={<MdLibraryBooks />}>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={inputData.courseName}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter course name"
            required
          />
        </FieldControl>
      </FieldGroup>

      <FieldGroup label="Course ID" htmlFor="courseId">
        <FieldControl icon={<FaIdCard />}>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={inputData.courseId}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter course ID"
            required
          />
        </FieldControl>
      </FieldGroup>
    </div>
  );
}
