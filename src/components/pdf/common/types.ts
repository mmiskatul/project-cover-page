export type TeamMember = {
  studentId?: string;
  studentName?: string;
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
};
