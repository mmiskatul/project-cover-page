import type { ReactNode } from "react";

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
