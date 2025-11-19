import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const usePDFDownload = () => {
  const downloadPDF = async (filename: string) => {
    const input = document.getElementById("pdf-content");
    if (!input) {
      console.error("Element with id 'pdf-content' not found.");
      return;
    }
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  };

  return {
    downloadPDF,
  };
};
