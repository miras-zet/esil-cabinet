import * as XLSX from 'xlsx';

export const exportHtmlTableToExcel = (
  tableId: string,
  filename: string,
  columnWidths: number[],
  centerColumns: number[]
) => {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Table with ID "${tableId}" not found.`);
    return;
  }

  // Convert table cells to string before exporting
  const rows = table.getElementsByTagName('tr');
  for (const row of rows) {
    const cells = row.getElementsByTagName('td');
    for (const cell of cells) {
      cell.textContent = String(cell.textContent); // Force cell content to string
    }
  }

  // Convert HTML table to worksheet
  const worksheet = XLSX.utils.table_to_sheet(table);

  // Set column widths
  worksheet['!cols'] = columnWidths.map(width => ({ wpx: width }));

  // Decode worksheet range to get rows and columns
  const range = XLSX.utils.decode_range(worksheet['!ref'] || '');

  // Iterate through all cells in the range
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];

      if (!cell) continue;

      // Force all cells to be treated as strings
      cell.t = 's'; // Set type to 'string'
      if (typeof cell.v !== 'string') {
        cell.v = String(cell.v); // Convert non-string values to string
      }

      // Apply center alignment to specified columns
      if (centerColumns.includes(col)) {
        cell.s = cell.s || {};
        cell.s.alignment = { horizontal: 'center' };
      }
    }
  }

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Страница 1');

  // Export the workbook to a file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
