import * as XLSX from 'xlsx';

export interface ExcelProcessOption {
  filePath?: string;
  sheet: XLSX.WorkSheet;
  from: number;
  to: number;
}
