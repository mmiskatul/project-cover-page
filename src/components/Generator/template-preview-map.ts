import AgriPreviewPDF from "../pdf/department/AgriPreviewPDF";
import BbaPreviewPDF from "../pdf/department/BbaPreviewPDF";
import CivilPreviewPDF from "../pdf/department/CivilPreviewPDF";
import DefaultPreviewPDF from "../pdf/department/DefaultPreviewPDF";
import EngPreviewPDF from "../pdf/department/EngPreviewPDF";
import NfePreviewPDF from "../pdf/department/NfePreviewPDF";
import SwePreviewPDF from "../pdf/department/SwePreviewPDF";
import TextilePreviewPDF from "../pdf/department/TextilePreviewPDF";
import ThmPreviewPDF from "../pdf/department/ThmPreviewPDF";

export const TEMPLATE_PREVIEW_COMPONENTS = Object.freeze({
  swe: SwePreviewPDF,
  bba: BbaPreviewPDF,
  nfe: NfePreviewPDF,
  agri: AgriPreviewPDF,
  default: DefaultPreviewPDF,
  eng: EngPreviewPDF,
  txt: TextilePreviewPDF,
  civil: CivilPreviewPDF,
  thm: ThmPreviewPDF,
});
