"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  BatchSectionFields,
  CourseFields,
  CourseTypeField,
  DateField,
  DepartmentField,
  LevelTermField,
  SemesterField,
  TeacherInfoFields,
  TextInputField,
  TopicField,
} from "@/components/forms/fields";
import { BsPersonFill } from "react-icons/bs";
import { FaIdCard } from "react-icons/fa";
import {
  FiBook,
  FiUsers,
  FiUserCheck,
  FiSliders,
  FiChevronDown,
} from "react-icons/fi";
import type {
  AssignmentFormData,
  FormInputChangeEvent,
  SweCriteriaRow,
  TeamMember,
} from "@/components/forms/types";
import {
  createEmptySweCriteriaRows,
  getDefaultSweEvaluation,
} from "@/components/pdf/department/swe-evaluation-config";

type CriteriaKey = "evaluationTitles" | "presentationTitles";
type StringFieldKey = Exclude<
  keyof AssignmentFormData,
  "teamName" | "evaluationTitles" | "presentationTitles"
>;

type AssignmentInputFormProps = {
  inputData: AssignmentFormData;
  setInputData: Dispatch<SetStateAction<AssignmentFormData>>;
  templateName?: string;
};

type CriteriaEditorProps = {
  title: string;
  placeholder: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  addLabel: string;
  addClassName: string;
};

type StudentInfoSectionProps = {
  members: TeamMember[];
  studentName: string;
  studentId: string;
  onMemberChange: (index: number, field: keyof TeamMember, value: string) => void;
  onAddMember: () => void;
  onRemoveMember: (index: number) => void;
};

type SweCriteriaEditorProps = {
  rows: SweCriteriaRow[];
  defaultRows: SweCriteriaRow[];
  onChange: (index: number, field: keyof SweCriteriaRow, value: string) => void;
  onAdd: () => void;
  onDelete: (id: string | number) => void;
};

const DEPARTMENT_TEMPLATES = new Set(["default", "bba", "eng", "thm"]);
const LEVEL_TERM_TEMPLATES = new Set(["nfe", "txt", "agri"]);
const EVALUATION_CRITERIA_TEMPLATES = new Set(["nfe", "txt", "agri", "civil"]);
const PRESENTATION_CRITERIA_TEMPLATES = new Set(["txt", "agri"]);
const CUSTOM_TEXT_TEMPLATES = new Set(["nfe", "txt", "agri", "civil"]);

const CUSTOM_TEXT_FIELDS: Array<{
  key: StringFieldKey;
  label: string;
  placeholder: string;
}> = [
  { key: "assignmentSectionTitle", label: "Assignment Section Title", placeholder: "Assignment" },
  { key: "presentationSectionTitle", label: "Presentation Section Title", placeholder: "Presentation" },
];

const TEMPLATE_CUSTOM_TEXT_FIELDS: Partial<Record<string, StringFieldKey[]>> = {
  nfe: ["assignmentSectionTitle"],
  txt: ["assignmentSectionTitle", "presentationSectionTitle"],
  agri: ["assignmentSectionTitle", "presentationSectionTitle"],
  civil: ["assignmentSectionTitle"],
};

function getVisibleCustomTextFields(templateName: string) {
  const allowedKeys = TEMPLATE_CUSTOM_TEXT_FIELDS[templateName] || [];
  return CUSTOM_TEXT_FIELDS.filter((field) => allowedKeys.includes(field.key));
}

function CustomTextEditor({
  inputData,
  onChange,
  fields,
}: {
  inputData: AssignmentFormData;
  onChange: (event: FormInputChangeEvent) => void;
  fields: typeof CUSTOM_TEXT_FIELDS;
}) {
  return (
    <details className="rounded-lg border border-slate-300 bg-slate-50">
      <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-sm text-slate-800">
        Custom Text
      </summary>
      <div className="space-y-3 border-t border-slate-200 px-4 py-4">
        <p className="text-xs text-slate-500">
          Leave any field empty to keep the default template text.
        </p>
        {fields.map((field) => (
          <input
            key={field.key}
            type="text"
            name={field.key}
            aria-label={field.label}
            placeholder={field.placeholder}
            value={inputData[field.key] as string}
            onChange={onChange}
            className="border p-2 rounded w-full text-sm bg-white"
          />
        ))}
      </div>
    </details>
  );
}

function resolveTemplateName(templateName?: string, pathname?: string) {
  if (templateName) return templateName.toLowerCase();
  if (!pathname) return "";
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "template" && parts[1]) return parts[1].toLowerCase();
  return "";
}

function CriteriaEditor({
  title,
  placeholder,
  items,
  onChange,
  onAdd,
  onRemove,
  addLabel,
  addClassName,
}: CriteriaEditorProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">{title}</h2>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder={placeholder}
            value={item}
            onChange={(event) => onChange(index, event.target.value)}
            className="border p-2 rounded flex-1 text-sm"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className={`px-3 py-2 text-white rounded text-sm ${addClassName}`}
      >
        {addLabel}
      </button>
    </div>
  );
}

type FormAccordionSectionProps = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function FormAccordionSection({
  title,
  subtitle,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
}: FormAccordionSectionProps) {
  return (
    <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-slate-50/80 hover:bg-slate-100 transition-colors text-left cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0 border border-blue-100">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                {title}
              </h3>
              {badge && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 pl-2">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            {isOpen ? "Close" : "Open"}
          </span>
          <FiChevronDown
            className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-3 border-t border-slate-100 space-y-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

function StudentInfoSection({
  members,
  studentName,
  studentId,
  onMemberChange,
  onAddMember,
  onRemoveMember,
}: StudentInfoSectionProps) {
  const effectiveMembers =
    members.length > 0
      ? members
      : [{ studentName: studentName || "", studentId: studentId || "" }];

  const isMultiple = effectiveMembers.length > 1;

  return (
    <div className="space-y-3">

      {!isMultiple ? (
        <div className="space-y-3">
          <TextInputField
            label="Full Name"
            htmlFor="studentName"
            name="studentName"
            value={effectiveMembers[0]?.studentName ?? studentName}
            onChange={(e) => onMemberChange(0, "studentName", e.target.value)}
            icon={<BsPersonFill />}
            placeholder="Enter student full name (e.g. Md. Miskatul Masabi)"
            required
          />
          <TextInputField
            label="Student ID"
            htmlFor="studentId"
            name="studentId"
            value={effectiveMembers[0]?.studentId ?? studentId}
            onChange={(e) => onMemberChange(0, "studentId", e.target.value)}
            icon={<FaIdCard />}
            placeholder="Enter student ID (e.g. 232-35-594)"
            required
          />
          <button
            type="button"
            onClick={onAddMember}
            className="w-full py-2 px-3 border border-dashed border-blue-400 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            + Add Another Student (for Group / Thesis / Report)
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {effectiveMembers.map((member, index) => (
            <div
              key={`student-member-${index}`}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Student {index + 1} {index === 0 ? "(Lead)" : ""}
                </span>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => onRemoveMember(index)}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              <TextInputField
                label="Full Name"
                htmlFor={`studentName-${index}`}
                name={`studentName-${index}`}
                value={member.studentName}
                onChange={(e) => onMemberChange(index, "studentName", e.target.value)}
                icon={<BsPersonFill />}
                placeholder={`Student ${index + 1} Full Name`}
                required
              />
              <TextInputField
                label="Student ID"
                htmlFor={`studentId-${index}`}
                name={`studentId-${index}`}
                value={member.studentId}
                onChange={(e) => onMemberChange(index, "studentId", e.target.value)}
                icon={<FaIdCard />}
                placeholder={`Student ${index + 1} ID`}
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={onAddMember}
            className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            + Add Another Student
          </button>
        </div>
      )}
    </div>
  );
}

function SweCriteriaEditor({ rows, defaultRows, onChange, onAdd, onDelete }: SweCriteriaEditorProps) {
  // Seed missing IDs locally so React has stable keys even before first add
  const seededRows = rows.map((row, i) => ({
    ...row,
    id: row.id || `seed-${i}-${row.label}`,
  }));

  const effectiveRows = seededRows.map((row, index) => ({
    ...row,
    label: row.label?.trim() ? row.label : (defaultRows[index]?.label || ""),
    mark: row.mark?.trim() ? row.mark : (defaultRows[index]?.mark || ""),
  }));

  return (
    <details className="rounded-lg border border-slate-300 bg-slate-50" open>
      <summary className="cursor-pointer list-none px-3 py-3 font-semibold text-sm text-slate-800 flex items-center justify-between">
        <span>SWE Table Data</span>
        <span className="text-xs font-normal text-slate-400">{rows.length} row{rows.length !== 1 ? "s" : ""}</span>
      </summary>
      <div className="space-y-3 border-t border-slate-200 px-3 py-3">

        {/* Row editor — responsive card layout */}
        <div className="space-y-2">
          {seededRows.map((row, index) => (
            <div key={row.id} className="rounded-lg border border-slate-200 bg-white p-2">
              {/* Top: number + label */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs text-slate-400 w-4 text-center shrink-0 font-medium">{index + 1}.</span>
                <input
                  type="text"
                  placeholder={defaultRows[index]?.label || `Row ${index + 1} title`}
                  value={row.label}
                  onChange={(e) => onChange(index, "label", e.target.value)}
                  className="border border-slate-300 px-2 py-1.5 rounded-md flex-1 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {/* Bottom: mark + delete */}
              <div className="flex items-center gap-1.5 pl-5">
                <span className="text-[11px] text-slate-400 shrink-0">Mark:</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={defaultRows[index]?.mark || "0"}
                  value={row.mark}
                  onChange={(e) => onChange(index, "mark", e.target.value)}
                  className="border border-slate-300 px-2 py-1.5 rounded-md w-16 text-sm bg-slate-50 text-center focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all"
                />
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => onDelete(row.id!)}
                  disabled={rows.length <= 1}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                  title="Delete row"
                  aria-label="Delete row"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Row button */}
        <button
          type="button"
          onClick={onAdd}
          className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Add New Row
        </button>

        {/* Live preview */}
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
          <p className="text-xs text-slate-400 mb-1.5 font-medium uppercase tracking-wide">Preview</p>
          {effectiveRows.map((row, index) => (
            <p key={`swe-preview-${index}`} className="leading-relaxed">
              <span className="text-slate-400">{index + 1}.</span>{" "}
              <span className="font-medium">{row.label || "Untitled"}</span>{" "}
              <span className="text-indigo-500">({row.mark || "0"})</span>
            </p>
          ))}
        </div>
      </div>
    </details>
  );
}

export default function AssignmentInputForm({
  inputData,
  setInputData,
  templateName,
}: AssignmentInputFormProps) {
  const pathname = usePathname();
  const activeTemplate = useMemo(
    () => resolveTemplateName(templateName, pathname || ""),
    [pathname, templateName]
  );

  const showCourseType = !["eng", "txt"].includes(activeTemplate);
  const showSemester = activeTemplate !== "eng";
  const showDepartment = DEPARTMENT_TEMPLATES.has(activeTemplate);
  const showTopic = activeTemplate !== "swe";
  const showLevelTerm = LEVEL_TERM_TEMPLATES.has(activeTemplate);
  const showEvaluationCriteria = EVALUATION_CRITERIA_TEMPLATES.has(activeTemplate);
  const showPresentationCriteria =
    PRESENTATION_CRITERIA_TEMPLATES.has(activeTemplate);
  const showCustomText = CUSTOM_TEXT_TEMPLATES.has(activeTemplate);
  const showSweCriteriaEditor = activeTemplate === "swe";
  const defaultSweCriteriaRows = getDefaultSweEvaluation(inputData.courseType).rows;
  const visibleCustomTextFields = getVisibleCustomTextFields(activeTemplate);

  const handleChange = (event: FormInputChangeEvent) => {
    const key = event.target.name as StringFieldKey;
    const value = event.target.value;
    setInputData((prev) => {
      const updates: Partial<AssignmentFormData> = { [key]: value };
      if (key === "studentName" || key === "studentId") {
        const nextTeam =
          Array.isArray(prev.teamName) && prev.teamName.length > 0
            ? [...prev.teamName]
            : [{ studentName: "", studentId: "" }];
        nextTeam[0] = {
          ...nextTeam[0],
          [key === "studentName" ? "studentName" : "studentId"]: value,
        };
        updates.teamName = nextTeam;
      }
      return { ...prev, ...updates };
    });
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setInputData((prev) => {
      const nextTeam =
        Array.isArray(prev.teamName) && prev.teamName.length > 0
          ? [...prev.teamName]
          : [{ studentName: prev.studentName || "", studentId: prev.studentId || "" }];

      while (nextTeam.length <= index) {
        nextTeam.push({ studentName: "", studentId: "" });
      }

      nextTeam[index] = { ...nextTeam[index], [field]: value };

      const updates: Partial<AssignmentFormData> = { teamName: nextTeam };
      if (index === 0) {
        if (field === "studentName") updates.studentName = value;
        if (field === "studentId") updates.studentId = value;
      }
      return { ...prev, ...updates };
    });
  };

  const addTeamMember = () => {
    setInputData((prev) => {
      const currentFirst: TeamMember = {
        studentName: prev.studentName || prev.teamName?.[0]?.studentName || "",
        studentId: prev.studentId || prev.teamName?.[0]?.studentId || "",
      };
      const existing =
        Array.isArray(prev.teamName) && prev.teamName.length > 0
          ? [...prev.teamName]
          : [currentFirst];

      if (existing.length === 1 && !existing[0].studentName && !existing[0].studentId) {
        existing[0] = currentFirst;
      }

      return {
        ...prev,
        studentName: existing[0]?.studentName || prev.studentName,
        studentId: existing[0]?.studentId || prev.studentId,
        teamName: [...existing, { studentId: "", studentName: "" }],
      };
    });
  };

  const removeTeamMember = (index: number) => {
    setInputData((prev) => {
      if (!Array.isArray(prev.teamName) || prev.teamName.length <= 1) return prev;
      const nextTeam = prev.teamName.filter((_, memberIndex) => memberIndex !== index);
      return {
        ...prev,
        teamName: nextTeam,
        studentName: nextTeam[0]?.studentName ?? prev.studentName,
        studentId: nextTeam[0]?.studentId ?? prev.studentId,
      };
    });
  };

  const updateCriteria = (key: CriteriaKey, index: number, value: string) => {
    setInputData((prev) => {
      const nextItems = [...prev[key]];
      nextItems[index] = value;
      return { ...prev, [key]: nextItems };
    });
  };

  const addCriteria = (key: CriteriaKey) => {
    const defaultLabel =
      key === "presentationTitles"
        ? "New Presentation Criteria (1)"
        : "New Criteria (1)";

    setInputData((prev) => ({
      ...prev,
      [key]: [...prev[key], defaultLabel],
    }));
  };

  const removeCriteria = (key: CriteriaKey, index: number) => {
    setInputData((prev) => {
      if (prev[key].length <= 1) return prev;
      return {
        ...prev,
        [key]: prev[key].filter((_, criteriaIndex) => criteriaIndex !== index),
      };
    });
  };

  const updateSweCriteriaRow = (
    index: number,
    field: keyof SweCriteriaRow,
    value: string
  ) => {
    setInputData((prev) => {
      const nextRows = prev.sweCriteriaRows.map((r, i) =>
        i === index
          ? { ...r, [field]: value }
          : r
      );
      return { ...prev, sweCriteriaRows: nextRows };
    });
  };

  const genRowId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const addSweCriteriaRow = () => {
    setInputData((prev) => ({
      ...prev,
      sweCriteriaRows: [
        // ensure existing rows all have IDs
        ...prev.sweCriteriaRows.map((r) => (r.id ? r : { ...r, id: genRowId() })),
        { id: genRowId(), label: "", mark: "" },
      ],
    }));
  };

  const deleteSweCriteriaRow = (idOrIndex: string | number) => {
    setInputData((prev) => {
      if (prev.sweCriteriaRows.length <= 1) return prev;
      return {
        ...prev,
        sweCriteriaRows: prev.sweCriteriaRows.filter((r, idx) => {
          if (typeof idOrIndex === "number") return idx !== idOrIndex;
          if (r.id) return r.id !== idOrIndex;
          return `seed-${idx}-${r.label}` !== idOrIndex && String(idx) !== idOrIndex;
        }),
      };
    });
  };

  useEffect(() => {
    if (!inputData.teamName || inputData.teamName.length === 0) {
      setInputData((prev) => ({
        ...prev,
        teamName: [{ studentId: "", studentName: "" }],
      }));
    }
  }, [inputData.teamName, setInputData]);

  const prevCourseTypeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!showSweCriteriaEditor) return;

    // First mount: initialize rows only if completely empty
    if (prevCourseTypeRef.current === null) {
      prevCourseTypeRef.current = inputData.courseType;
      if (!inputData.sweCriteriaRows || inputData.sweCriteriaRows.length === 0) {
        const defaultRows = createEmptySweCriteriaRows(
          getDefaultSweEvaluation(inputData.courseType).rows
        );
        setInputData((prev) => ({ ...prev, sweCriteriaRows: defaultRows }));
      }
      return;
    }

    // Subsequent updates: only reset rows if courseType actually changed
    if (prevCourseTypeRef.current !== inputData.courseType) {
      prevCourseTypeRef.current = inputData.courseType;
      const defaultRows = createEmptySweCriteriaRows(
        getDefaultSweEvaluation(inputData.courseType).rows
      );
      setInputData((prev) => ({
        ...prev,
        sweCriteriaRows: defaultRows,
      }));
    }
  }, [inputData.courseType, inputData.sweCriteriaRows, setInputData, showSweCriteriaEditor]);

  const [openSections, setOpenSections] = useState({
    subject: true,
    student: true,
    teacher: true,
    rubric: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const expandAll = () => {
    setOpenSections({
      subject: true,
      student: true,
      teacher: true,
      rubric: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      subject: false,
      student: false,
      teacher: false,
      rubric: false,
    });
  };

  const hasSettingsOrRubric =
    showSweCriteriaEditor ||
    showCustomText ||
    showEvaluationCriteria ||
    showPresentationCriteria;

  const effectiveStudentsCount =
    Array.isArray(inputData.teamName) && inputData.teamName.length > 0
      ? inputData.teamName.length
      : inputData.studentName
      ? 1
      : 0;

  return (
    <form className="w-full flex flex-col text-sm text-slate-800">
      <div className="w-full mb-3 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-bold text-slate-800">Fill up the form</h1>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="w-full space-y-3">
        {/* Section 1: Subject & Course Info */}
        <FormAccordionSection
          title="Subject & Course Info"
          subtitle={
            inputData.courseId || inputData.courseName
              ? `${inputData.courseId || ""} ${inputData.courseName ? "• " + inputData.courseName : ""}`
              : "Course code, name, batch, section & semester"
          }
          icon={<FiBook />}
          isOpen={openSections.subject}
          onToggle={() => toggleSection("subject")}
        >
          {showCourseType && (
            <CourseTypeField inputData={inputData} onChange={handleChange} />
          )}
          <CourseFields inputData={inputData} onChange={handleChange} />
          <BatchSectionFields inputData={inputData} onChange={handleChange} />
          {showSemester && (
            <SemesterField inputData={inputData} onChange={handleChange} />
          )}
          {showDepartment && (
            <DepartmentField inputData={inputData} onChange={handleChange} />
          )}
          {showTopic && <TopicField inputData={inputData} onChange={handleChange} />}
          {showLevelTerm && (
            <LevelTermField inputData={inputData} onChange={handleChange} />
          )}
        </FormAccordionSection>

        {/* Section 2: Student Info */}
        <FormAccordionSection
          title="Student Info"
          subtitle={
            effectiveStudentsCount > 1
              ? `${effectiveStudentsCount} students added`
              : inputData.studentName
              ? inputData.studentName
              : "Enter student name & ID"
          }
          icon={<FiUsers />}
          badge={
            effectiveStudentsCount > 1
              ? `${effectiveStudentsCount} Students`
              : effectiveStudentsCount === 1
              ? "1 Student"
              : undefined
          }
          isOpen={openSections.student}
          onToggle={() => toggleSection("student")}
        >
          <StudentInfoSection
            members={
              Array.isArray(inputData.teamName) && inputData.teamName.length > 0
                ? inputData.teamName
                : [
                    {
                      studentName: inputData.studentName || "",
                      studentId: inputData.studentId || "",
                    },
                  ]
            }
            studentName={inputData.studentName}
            studentId={inputData.studentId}
            onMemberChange={handleTeamMemberChange}
            onAddMember={addTeamMember}
            onRemoveMember={removeTeamMember}
          />
        </FormAccordionSection>

        {/* Section 3: Teacher Info & Date */}
        <FormAccordionSection
          title="Teacher Info & Date"
          subtitle={
            inputData.teacherName
              ? `${inputData.teacherName}${inputData.teacherDesignation ? " • " + inputData.teacherDesignation : ""}`
              : "Teacher name, designation & submission date"
          }
          icon={<FiUserCheck />}
          isOpen={openSections.teacher}
          onToggle={() => toggleSection("teacher")}
        >
          <TeacherInfoFields
            inputData={inputData}
            onChange={handleChange}
            showTeacherId={activeTemplate === "eng"}
          />
          <DateField inputData={inputData} onChange={handleChange} />
        </FormAccordionSection>

        {/* Section 4: Rubrics & Custom Settings (if applicable) */}
        {hasSettingsOrRubric && (
          <FormAccordionSection
            title="Evaluation Rubric & Settings"
            subtitle="Customize mark distribution and custom text"
            icon={<FiSliders />}
            isOpen={openSections.rubric}
            onToggle={() => toggleSection("rubric")}
          >
            {showSweCriteriaEditor && (
              <SweCriteriaEditor
                rows={inputData.sweCriteriaRows}
                defaultRows={defaultSweCriteriaRows}
                onChange={updateSweCriteriaRow}
                onAdd={addSweCriteriaRow}
                onDelete={deleteSweCriteriaRow}
              />
            )}

            {showCustomText && (
              <CustomTextEditor
                inputData={inputData}
                onChange={handleChange}
                fields={visibleCustomTextFields}
              />
            )}

            {showEvaluationCriteria && (
              <CriteriaEditor
                title="Assignment Evaluation Criteria"
                placeholder="Evaluation Criteria"
                items={inputData.evaluationTitles}
                onChange={(index, value) =>
                  updateCriteria("evaluationTitles", index, value)
                }
                onAdd={() => addCriteria("evaluationTitles")}
                onRemove={(index) => removeCriteria("evaluationTitles", index)}
                addLabel="+ Add Assignment Criteria"
                addClassName="bg-green-500 hover:bg-green-600"
              />
            )}

            {showPresentationCriteria && (
              <CriteriaEditor
                title="Presentation Evaluation Criteria"
                placeholder="Presentation Criteria"
                items={inputData.presentationTitles}
                onChange={(index, value) =>
                  updateCriteria("presentationTitles", index, value)
                }
                onAdd={() => addCriteria("presentationTitles")}
                onRemove={(index) => removeCriteria("presentationTitles", index)}
                addLabel="+ Add Presentation Criteria"
                addClassName="bg-blue-500 hover:bg-blue-600"
              />
            )}
          </FormAccordionSection>
        )}
      </div>
    </form>
  );
}
