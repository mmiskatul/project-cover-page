import PreviewPDFAgri from "../AgiPdf/PreviewPDF";
import Default2PreviewPDF from "../BBAPdf/Default2PreviewPDF";
import PreviewPDFCivil from "../CivilPdf/PreviewPDF";
import DefaultPreview from "../DefaultPdf/DefaultPreviewPDF";
import PreviewPDFENG from "../ENGPdf/PreviewPDF";
import PreviewPDFNFE from "../NFEPdf/PreviewPDF";
import PreviewPDF from "../SWEPdf/PreviewPDF";
import PreviewPDFTxt from "../TextilePdf/PreviewPDF";
import PreviewPDFTHM from "../THMPDF/PreviewPDF";

export const TEMPLATE_PREVIEW_COMPONENTS = Object.freeze({
  swe: PreviewPDF,
  bba: Default2PreviewPDF,
  nfe: PreviewPDFNFE,
  agri: PreviewPDFAgri,
  default: DefaultPreview,
  eng: PreviewPDFENG,
  txt: PreviewPDFTxt,
  civil: PreviewPDFCivil,
  thm: PreviewPDFTHM,
});
