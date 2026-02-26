"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  BatchSectionFields,
  CourseFields,
  CourseTypeField,
  DateField,
  DepartmentField,
  LevelTermField,
  SemesterField,
  StudentInfoFields,
  TeacherInfoFields,
  TopicField,
} from "@/components/forms/fields";
import type {
  AssignmentFormData,
  FormInputChangeEvent,
  TeamMember,
} from "@/components/forms/types";

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

type TeamMemberEditorProps = {
  members: TeamMember[];
  onChange: (index: number, field: keyof TeamMember, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const DEPARTMENT_TEMPLATES = new Set(["default", "bba", "eng", "thm"]);
const LEVEL_TERM_TEMPLATES = new Set(["nfe", "txt", "agri"]);
const EVALUATION_CRITERIA_TEMPLATES = new Set(["nfe", "txt", "agri", "civil"]);
const PRESENTATION_CRITERIA_TEMPLATES = new Set(["txt", "agri"]);

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

function TeamMemberEditor({
  members,
  onChange,
  onAdd,
  onRemove,
}: TeamMemberEditorProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Team Members</h2>
      {members.map((member, index) => (
        <div key={`team-member-${index}`} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Student ID"
            value={member.studentId}
            onChange={(event) => onChange(index, "studentId", event.target.value)}
            className="border p-2 rounded flex-1 text-sm"
          />
          <input
            type="text"
            placeholder="Student Name"
            value={member.studentName}
            onChange={(event) => onChange(index, "studentName", event.target.value)}
            className="border p-2 rounded flex-1 text-sm"
          />
          {members.length > 1 && (
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
        className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        + Add Member
      </button>
    </div>
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

  const handleChange = (event: FormInputChangeEvent) => {
    const key = event.target.name as StringFieldKey;
    const value = event.target.value;
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setInputData((prev) => {
      const nextTeam = [...prev.teamName];
      nextTeam[index] = { ...nextTeam[index], [field]: value };
      return { ...prev, teamName: nextTeam };
    });
  };

  const addTeamMember = () => {
    setInputData((prev) => ({
      ...prev,
      teamName: [...prev.teamName, { studentId: "", studentName: "" }],
    }));
  };

  const removeTeamMember = (index: number) => {
    setInputData((prev) => {
      if (prev.teamName.length <= 1) return prev;
      return {
        ...prev,
        teamName: prev.teamName.filter((_, memberIndex) => memberIndex !== index),
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

  useEffect(() => {
    if (!inputData.teamName || inputData.teamName.length === 0) {
      setInputData((prev) => ({
        ...prev,
        teamName: [{ studentId: "", studentName: "" }],
      }));
    }
  }, [inputData.teamName, setInputData]);

  return (
    <form className="flex flex-col items-center text-sm text-slate-800">
      <h1 className="text-xl font-bold mb-4">Fill up the form</h1>

      <div className="max-w-96 w-full px-4 space-y-4">
        {showCourseType && (
          <CourseTypeField inputData={inputData} onChange={handleChange} />
        )}

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

        {inputData.courseType === "project" ? (
          <TeamMemberEditor
            members={inputData.teamName}
            onChange={handleTeamMemberChange}
            onAdd={addTeamMember}
            onRemove={removeTeamMember}
          />
        ) : (
          <StudentInfoFields inputData={inputData} onChange={handleChange} />
        )}

        <BatchSectionFields inputData={inputData} onChange={handleChange} />
        <CourseFields inputData={inputData} onChange={handleChange} />
        <TeacherInfoFields
          inputData={inputData}
          onChange={handleChange}
          showTeacherId={activeTemplate === "eng"}
        />
        <DateField inputData={inputData} onChange={handleChange} />
      </div>
    </form>
  );
}
