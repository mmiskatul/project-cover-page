import { HiOutlineUser } from "react-icons/hi2";
import type { BasicFieldProps } from "@/components/forms/types";
import { TextInputField } from "./field-primitives";

export function TopicField({ inputData, onChange }: BasicFieldProps) {
  return (
    <TextInputField
      label="Topic Name"
      htmlFor="topicname"
      name="topicname"
      value={inputData.topicname}
      onChange={onChange}
      icon={<HiOutlineUser className="text-lg" />}
      placeholder="Enter topic name"
      required
      groupClassName="mb-6"
      controlClassName="h-12"
    />
  );
}
