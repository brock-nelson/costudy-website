/**
 * CSV Export Utilities
 * Converts data to CSV format for download
 */

export function convertToCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return "";

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV header row
  const headerRow = headers.map(escapeCSVValue).join(",");

  // Create data rows
  const dataRows = data.map(row =>
    headers.map(header => escapeCSVValue(row[header])).join(",")
  );

  return [headerRow, ...dataRows].join("\n");
}

function escapeCSVValue(value: unknown): string {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);

  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (stringValue.includes(",") || stringValue.includes("\n") || stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatDateForCSV(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString();
}
