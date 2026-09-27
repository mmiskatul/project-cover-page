export type TemplateItem = {
  id: number;
  name: string;
  fullName: string;
  tempLogo: string;
  category: "Engineering" | "Business" | "Science" | "Humanities" | "General";
  tag: string;
  description: string;
  popular?: boolean;
};

export const TEMPLATE_CATALOG: TemplateItem[] = [
  {
    id: 1,
    name: "swe",
    fullName: "Software Engineering",
    tempLogo: "/assets/templateSWE.png",
    category: "Engineering",
    tag: "Evaluation Table",
    description: "Features SWE teacher evaluation rubric and team/individual layout.",
    popular: true,
  },
  {
    id: 2,
    name: "default",
    fullName: "Classic Academic",
    tempLogo: "/assets/template1.png",
    category: "General",
    tag: "Universal",
    description: "Standard clean university format suitable for any department or course.",
    popular: true,
  },
  {
    id: 3,
    name: "bba",
    fullName: "Business Administration",
    tempLogo: "/assets/template2.png",
    category: "Business",
    tag: "Modern Split",
    description: "Two-column modern design with color banners for business reports.",
    popular: true,
  },
  {
    id: 4,
    name: "nfe",
    fullName: "Nutrition & Food Engineering",
    tempLogo: "/assets/templateNFE.png",
    category: "Engineering",
    tag: "Evaluation Table",
    description: "Departmental evaluation grid with assignment and lab criteria.",
  },
  {
    id: 5,
    name: "agri",
    fullName: "Agricultural Science",
    tempLogo: "/assets/templateAGI.png",
    category: "Science",
    tag: "Presentation & Lab",
    description: "Tailored for agricultural science assignments and presentation reports.",
  },
  {
    id: 6,
    name: "eng",
    fullName: "Department of English",
    tempLogo: "/assets/templateENG.png",
    category: "Humanities",
    tag: "Centered Classic",
    description: "Elegant typography-focused cover for humanities and language assignments.",
  },
  {
    id: 7,
    name: "txt",
    fullName: "Textile Engineering",
    tempLogo: "/assets/templateTxt.png",
    category: "Engineering",
    tag: "Lab & Project",
    description: "Specific formatting for textile labs, fabric reports, and project submissions.",
  },
  {
    id: 8,
    name: "civil",
    fullName: "Civil Engineering",
    tempLogo: "/assets/templateCivil.png",
    category: "Engineering",
    tag: "Evaluation Table",
    description: "Includes official civil rubric table and signature blocks.",
  },
  {
    id: 9,
    name: "thm",
    fullName: "Tourism & Hospitality Management",
    tempLogo: "/assets/templateTHM.png",
    category: "Business",
    tag: "Professional",
    description: "Refined presentation layout for hospitality and tourism case studies.",
  },
];

export const TEMPLATE_BY_NAME = TEMPLATE_CATALOG.reduce((acc, template) => {
  acc[template.name] = template;
  return acc;
}, {});

export function getTemplateByName(name) {
  if (!name) return null;
  return TEMPLATE_BY_NAME[name] || null;
}
