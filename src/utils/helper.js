import { TJPG, TMULTIFILE, TPDF, TPNG, TPPTX, TWORD, TXLS } from "../assets";
import { JPG, PDF, PNG, PPTX, WORD, XLS } from "../constant";

export const mapFileTypeToIcon = (type) => {
  switch (type) {
    case PNG:
      return TPNG;
    case JPG.JPEG:
    case JPG.JPG:
      return TJPG;
    case WORD.MSWORD:
    case WORD.APPWORD:
      return TWORD;
    case PDF:
      return TPDF;
    case XLS.XLSOFFICE:
    case XLS.XLSEXCEL:
      return TXLS;
    case PPTX:
      return TPPTX;
    default:
      return TMULTIFILE;
  }
};
