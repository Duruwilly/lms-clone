interface CSVData {
  [key: string]: any;
}

type CSVHeaders = string[];
type CSVRows = (string | number | boolean | null)[][];

export const handleDownloadCSV = (
  data: CSVData[] | null | undefined,
  filename: string = "data.csv",
  headers: CSVHeaders,
  rows: CSVRows,
): void => {
  if (!data) return;

  // combine headers and rows into a CSV string
  const csvContent = [headers, ...rows]
    .map((row) => row.map((item) => `"${item}"`).join(","))
    .join("\n");

  // create a Blob and generate a URL
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // create a temporary anchor element and trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  // cleanup
  URL.revokeObjectURL(url);
};
