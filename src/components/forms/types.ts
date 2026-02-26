import type { ChangeEvent } from "react";

export type FormInputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export type TeamMember = {
  studentId: string;
  studentName: string;
};

export type AssignmentFormData = {
  teamName: TeamMember[];
  studentName: string;
  studentId: string;
  courseName: string;
  courseId: string;
  teacherName: string;
  teacherDesignation: string;
  courseTeacherId: string;
  semester: string;
  batch: string;
  section: string;
  courseType: string;
  date: string;
  department: string;
  topicname: string;
  logo: string;
  bglogo: string;
  level: string;
  evaluationTitles: string[];
  presentationTitles: string[];
};

export type BasicFieldProps = {
  inputData: AssignmentFormData;
  onChange: (event: FormInputChangeEvent) => void;
};

export type TeacherFieldProps = BasicFieldProps & {
  showTeacherId: boolean;
};
