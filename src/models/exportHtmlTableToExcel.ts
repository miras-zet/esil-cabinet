import * as XLSX from 'xlsx';

export const exportHtmlTableToExcel = (tableId: string, filename: string, columnWidths: number[], centerColumns: number[]) => {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Таблица с ID ${tableId} не найдена.`);
    return;
  }
  const worksheet = XLSX.utils.table_to_sheet(table);
  worksheet['!cols'] = columnWidths.map(width => ({ wpx: width }));
  const range = XLSX.utils.decode_range(worksheet['!ref'] || '');
  for (let col = 0; col < range.e.c; col++) {
    if (centerColumns.includes(col)) {
      const colKey = XLSX.utils.encode_col(col);
      for (let row = range.s.r; row <= range.e.r; row++) {
        const cellAddress = `${colKey}${row + 1}`; // Rows in `!ref` are 1-based
        if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
        worksheet[cellAddress].s = worksheet[cellAddress].s || {};
        worksheet[cellAddress].s.alignment = { horizontal: 'center' };
      }
    }
  }
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};