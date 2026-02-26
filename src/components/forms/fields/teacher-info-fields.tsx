"use client";

import { BsPersonFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdWork } from "react-icons/md";
import { TEACHER_DESIGNATION_OPTIONS } from "@/components/forms/constants";
import type { TeacherFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function TeacherInfoFields({
  inputData,
  onChange,
  showTeacherId,
}: TeacherFieldProps) {
  return (
    <div>
      <FieldGroup label="Teacher Name" htmlFor="teacherName">
        <FieldControl icon={<BsPersonFill />}>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={inputData.teacherName}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter teacher name"
            required
          />
        </FieldControl>
      </FieldGroup>

      {showTeacherId && (
        <FieldGroup label="Course Teacher ID" htmlFor="courseTeacherId" className="mb-6">
          <FieldControl
            icon={<HiOutlineIdentification className="text-lg" />}
            className="h-12"
          >
            <input
              type="text"
              id="courseTeacherId"
              name="courseTeacherId"
              value={inputData.courseTeacherId}
              onChange={onChange}
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter teacher ID"
              required
            />
          </FieldControl>
        </FieldGroup>
      )}

      <FieldGroup label="Designation" htmlFor="teacherDesignation">
        <FieldControl icon={<MdWork />}>
          <select
            id="teacherDesignation"
            name="teacherDesignation"
            value={inputData.teacherDesignation}
            onChange={onChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            required
          >
            <option value="" disabled>
              Select designation
            </option>
            {TEACHER_DESIGNATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldControl>
      </FieldGroup>
    </div>
  );
}
