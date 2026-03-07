export type TeamMember = {
  studentId?: string;
  studentName?: string;
};

export type SweCriteriaRow = {
  label?: string;
  mark?: string;
};

export type CoverTemplateData = {
  teamName?: TeamMember[];
  studentName?: string;
  studentId?: string;
  courseName?: string;
  courseId?: string;
  teacherName?: string;
  teacherDesignation?: string;
  courseTeacherId?: string;
  semester?: string;
  batch?: string;
  section?: string;
  courseType?: string;
  date?: string;
  department?: string;
  topicname?: string;
  logo?: string;
  bglogo?: string;
  level?: string;
  evaluationTitles?: string[];
  presentationTitles?: string[];
  sweCriteriaRows?: SweCriteriaRow[];
  departmentHeadingText?: string;
  reportTitleText?: string;
  assignmentSectionTitle?: string;
  presentationSectionTitle?: string;
  courseCodeLabelText?: string;
  courseTitleLabelText?: string;
  topicLabelText?: string;
  submittedToTitleText?: string;
  submittedByTitleText?: string;
  teacherNameLabelText?: string;
  teacherDesignationLabelText?: string;
  studentNameLabelText?: string;
  studentIdLabelText?: string;
  batchLabelText?: string;
  sectionLabelText?: string;
  semesterLabelText?: string;
  yearLabelText?: string;
  levelTermLabelText?: string;
  departmentLabelText?: string;
  teamMembersLabelText?: string;
  submissionDateLabelText?: string;
  universityNameText?: string;
};
