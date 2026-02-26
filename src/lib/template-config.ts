export const TEMPLATE_CATALOG = [
  {
    id: 1,
    name: "swe",
    fullName: "Software Engineering",
    tempLogo: "/assets/templateSWE.png",
  },
  {
    id: 2,
    name: "default",
    fullName: "Default Template",
    tempLogo: "/assets/template1.png",
  },
  {
    id: 3,
    name: "bba",
    fullName: "Default Template",
    tempLogo: "/assets/template2.png",
  },
  {
    id: 4,
    name: "nfe",
    fullName: "Nutrition and Food Engineering",
    tempLogo: "/assets/templateNFE.png",
  },
  {
    id: 5,
    name: "agri",
    fullName: "Agricultural Science",
    tempLogo: "/assets/templateAGI.png",
  },
  {
    id: 6,
    name: "eng",
    fullName: "Department of English",
    tempLogo: "/assets/templateENG.png",
  },
  {
    id: 7,
    name: "txt",
    fullName: "Department of Textile Engineering",
    tempLogo: "/assets/templateTxt.png",
  },
  {
    id: 8,
    name: "civil",
    fullName: "Department of Civil Engineering",
    tempLogo: "/assets/templateCivil.png",
  },
  {
    id: 9,
    name: "thm",
    fullName: "Tourism and Hospitality Management",
    tempLogo: "/assets/templateTHM.png",
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
