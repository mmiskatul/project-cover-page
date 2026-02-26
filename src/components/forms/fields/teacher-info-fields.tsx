"use client";

import { BsPersonFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdWork } from "react-icons/md";
import { TEACHER_DESIGNATION_OPTIONS } from "@/components/forms/constants";
import type { TeacherFieldProps } from "@/components/forms/types";
import { SelectField, TextInputField } from "./field-primitives";

export function TeacherInfoFields({
  inputData,
  onChange,
  showTeacherId,
}: TeacherFieldProps) {
  return (
    <div>
      <TextInputField
        label="Teacher Name"
        htmlFor="teacherName"
        name="teacherName"
        value={inputData.teacherName}
        onChange={onChange}
        icon={<BsPersonFill />}
        placeholder="Enter teacher name"
        required
      />

      {showTeacherId && (
        <TextInputField
          label="Course Teacher ID"
          htmlFor="courseTeacherId"
          name="courseTeacherId"
          value={inputData.courseTeacherId}
          onChange={onChange}
          icon={<HiOutlineIdentification className="text-lg" />}
          placeholder="Enter teacher ID"
          required
          groupClassName="mb-6"
          controlClassName="h-12"
        />
      )}

      <SelectField
        label="Designation"
        htmlFor="teacherDesignation"
        name="teacherDesignation"
        value={inputData.teacherDesignation}
        onChange={onChange}
        icon={<MdWork />}
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
      </SelectField>
    </div>
  );
}
