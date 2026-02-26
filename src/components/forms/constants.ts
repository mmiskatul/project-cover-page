export const COURSE_TYPE_OPTIONS = [
  { value: "theory", label: "Theory" },
  { value: "lab assignment", label: "Lab Assignment" },
  { value: "project", label: "Project" },
  { value: "lab report", label: "Lab Report" },
  { value: "lab final", label: "Lab Final" },
] as const;

export const TEACHER_DESIGNATION_OPTIONS = [
  { value: "Professor & Head", label: "Professor & Head" },
  { value: "Professor", label: "Professor" },
  { value: "Associate Professor", label: "Associate Professor" },
  { value: "Assistant Professor", label: "Assistant Professor" },
  { value: "Senior Lecturer", label: "Senior Lecturer" },
  { value: "Lecturer", label: "Lecturer" },
] as const;

type DepartmentGroup = {
  label: string;
  options: Array<{ value: string; label: string }>;
};

export const DEPARTMENT_GROUPS: DepartmentGroup[] = [
  {
    label: "Faculty of Business and Entrepreneurship (FBE)",
    options: [
      { value: "Business Administration", label: "BBA" },
      { value: "Department of Management", label: "Management" },
      { value: "Department of Real Estate", label: "Real Estate" },
      { value: "Tourism & Hospitality Management", label: "Tourism" },
      { value: "Innovation & Entrepreneurship", label: "Innovation" },
      { value: "Department of Finance and Banking", label: "Finance" },
      { value: "Department of Accounting", label: "Accounting" },
      { value: "Department of Marketing", label: "Marketing" },
    ],
  },
  {
    label: "Faculty of Science and Information Technology (FSIT)",
    options: [
      { value: "Computer Science & Engineering", label: "CSE" },
      { value: "Computing & Information System", label: "CIS" },
      { value: "Software Engineering", label: "SWE" },
      {
        value: "Environmental Science and Disaster Management",
        label: "ESDM",
      },
      { value: "Multimedia & Creative Technology", label: "MCT" },
      { value: "Information Technology and Management", label: "ITM" },
      { value: "Physical Education & Sports Science", label: "PESS" },
    ],
  },
  {
    label: "Faculty of Engineering (FE)",
    options: [
      { value: "Information and Communication Engineering", label: "ICE" },
      { value: "Department of Textile Engineering", label: "Textile" },
      { value: "Electrical & Electronic Engineering", label: "EEE" },
      { value: "Department of Architecture", label: "Architecture" },
      { value: "Department of Civil Engineering", label: "Civil" },
    ],
  },
  {
    label: "Faculty of Health and Life Sciences (FHLS)",
    options: [
      { value: "Department of Pharmacy", label: "Pharmacy" },
      { value: "Department of Public Health", label: "Public Health" },
      { value: "Nutrition & Food Engineering", label: "NFE" },
      { value: "Department of Agricultural Science", label: "AGRI" },
      { value: "Genetic Engineering and Biotechnology", label: "Genetics" },
    ],
  },
  {
    label: "Faculty of Humanities and Social Sciences (FHSS)",
    options: [
      { value: "Department of English", label: "English" },
      { value: "Department of Law", label: "Law" },
      {
        value: "Department of Journalism & Mass Communication",
        label: "Journalism",
      },
      { value: "Department of Development Studies", label: "Development" },
      { value: "Information Science and Library Management", label: "ISLM" },
    ],
  },
];
