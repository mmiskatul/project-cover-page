import type { ReactNode } from "react";
import type { FormInputChangeEvent } from "@/components/forms/types";

type FieldGroupProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

type FieldControlProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FieldGroup({
  label,
  htmlFor,
  children,
  className = "",
}: FieldGroupProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FieldControl({
  icon,
  children,
  className = "",
}: FieldControlProps) {
  return (
    <div
      className={`flex items-center mt-2 mb-4 h-10 pl-3 pr-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden ${className}`}
    >
      <span className="text-gray-500">{icon}</span>
      {children}
    </div>
  );
}

type InputFieldProps = {
  label: string;
  htmlFor: string;
  name: string;
  value: string;
  onChange: (event: FormInputChangeEvent) => void;
  icon: ReactNode;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "date";
  groupClassName?: string;
  controlClassName?: string;
  inputClassName?: string;
};

type SelectFieldProps = {
  label: string;
  htmlFor: string;
  name: string;
  value: string;
  onChange: (event: FormInputChangeEvent) => void;
  icon: ReactNode;
  children: ReactNode;
  required?: boolean;
  groupClassName?: string;
  controlClassName?: string;
  selectClassName?: string;
};

const DEFAULT_CONTROL_CLASS = "h-full px-2 w-full outline-none bg-transparent";

export function TextInputField({
  label,
  htmlFor,
  name,
  value,
  onChange,
  icon,
  placeholder,
  required = false,
  type = "text",
  groupClassName,
  controlClassName,
  inputClassName = DEFAULT_CONTROL_CLASS,
}: InputFieldProps) {
  return (
    <FieldGroup label={label} htmlFor={htmlFor} className={groupClassName}>
      <FieldControl icon={icon} className={controlClassName}>
        <input
          type={type}
          id={htmlFor}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClassName}
          placeholder={placeholder}
          required={required}
        />
      </FieldControl>
    </FieldGroup>
  );
}

export function SelectField({
  label,
  htmlFor,
  name,
  value,
  onChange,
  icon,
  children,
  required = false,
  groupClassName,
  controlClassName,
  selectClassName = DEFAULT_CONTROL_CLASS,
}: SelectFieldProps) {
  return (
    <FieldGroup label={label} htmlFor={htmlFor} className={groupClassName}>
      <FieldControl icon={icon} className={controlClassName}>
        <select
          id={htmlFor}
          name={name}
          value={value}
          onChange={onChange}
          className={selectClassName}
          required={required}
        >
          {children}
        </select>
      </FieldControl>
    </FieldGroup>
  );
}
