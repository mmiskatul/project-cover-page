import { HiOutlineUser } from "react-icons/hi2";
import type { BasicFieldProps } from "@/components/forms/types";
import { FieldControl, FieldGroup } from "./field-primitives";

export function TopicField({ inputData, onChange }: BasicFieldProps) {
  return (
    <FieldGroup label="Topic Name" htmlFor="topicname" className="mb-6">
      <FieldControl icon={<HiOutlineUser className="text-lg" />} className="h-12">
        <input
          type="text"
          id="topicname"
          name="topicname"
          value={inputData.topicname}
          onChange={onChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          placeholder="Enter topic name"
          required
        />
      </FieldControl>
    </FieldGroup>
  );
}
