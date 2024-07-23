import * as XLSX from 'xlsx';

export const exportHtmlTableToExcel = (tableId: string, filename: string, columnWidths: number[]) => {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Таблица не найдена: ${tableId}`);
    return;
  }
  const worksheet = XLSX.utils.table_to_sheet(table);
  worksheet['!cols'] = columnWidths.map(width => ({ wpx: width }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Страница 1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};