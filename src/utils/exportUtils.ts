/**
 * Converts an array of objects to a CSV string.
 * @param data Array of objects to convert
 * @returns CSV string
 */
const convertToCSV = (data: any[]): string => {
  if (!data || data.length === 0) {
    return '';
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create header row
  const headerRow = headers.join(',');

  // Create data rows
  const rows = data.map(row => {
    return headers.map(header => {
      const cell = row[header] === null || row[header] === undefined ? '' : row[header];
      // Handle strings that might contain commas
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',');
  });

  return [headerRow, ...rows].join('\n');
};

/**
 * Triggers a file download in the browser.
 * @param content The content of the file
 * @param mimeType The MIME type of the file
 * @param filename The name of the file to download
 */
const downloadFile = (content: string, mimeType: string, filename: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports data to a CSV file.
 * @param data Array of objects to export
 * @param filename Name of the file (without extension)
 */
export const exportToCSV = (data: any[], filename: string = 'export') => {
  const csvContent = convertToCSV(data);
  downloadFile(csvContent, 'text/csv;charset=utf-8;', `${filename}.csv`);
};

/**
 * Exports data to a JSON file.
 * @param data Array of objects to export
 * @param filename Name of the file (without extension)
 */
export const exportToJSON = (data: any[], filename: string = 'export') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, 'application/json', `${filename}.json`);
};
