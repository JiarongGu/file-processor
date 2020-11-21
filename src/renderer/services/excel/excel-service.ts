import * as _ from 'lodash';
import * as XLSX from 'xlsx';

const NUMBER_CHAR = Array.apply(null, Array(26)).map((_, i) => String.fromCharCode(65 + i));
const CHAR_NUMBER = NUMBER_CHAR.reduce((p, c, i) => ((p[c] = i), p), {});

const NUMBER_C26 = Array.apply(null, Array(26)).map((_, i) => (i < 10 ? i.toString() : NUMBER_CHAR[i - 10]));
const C26_NUMBER = NUMBER_C26.reduce((p, c, i) => ((p[c] = i), p), {});

const parseColumnNum = (column: string) => {
  const c26Array = Array.apply(null, Array(column.length + 1)).map((x) => '0');

  column
    .split('')
    .reverse()
    .forEach((c, i) => {
      const num = CHAR_NUMBER[c] + 1;
      const cur = C26_NUMBER[c26Array[i]];
      const val = num === 26 ? 0 : num;

      c26Array[i] = cur ? NUMBER_C26[cur + val] : NUMBER_C26[val];

      if (val === 0) {
        c26Array[i + 1] = NUMBER_C26[1];
      }
    });

  return parseInt(c26Array.reverse().join(''), 26);
};

const parseColumnChar = (number: number) => {
  const numArray: Array<number> = [];
  const c26s = number.toString(26).toUpperCase().split('').reverse();

  c26s.forEach((c, i) => {
    const cur = numArray[i] ?? 0;
    const num = C26_NUMBER[c] + cur - 1;

    if (num < 0 && i !== c26s.length - 1) {
      numArray[i] = 25;
      numArray[i + 1] = num;
    } else {
      numArray[i] = num;
    }
  });

  return numArray
    .reverse()
    .map((num) => NUMBER_CHAR[num])
    .join('');
};

export class ExcelService {
  readRow(sheet: XLSX.WorkSheet, row: number, columns?: number) {
    if (!columns) columns = this.countColumn(sheet);
    const result: Array<string> = [];

    for (let i = 1; i <= columns; i++) {
      const fieldIndex = `${parseColumnChar(i)}${row}`;
      result.push(sheet[fieldIndex]?.v);
    }

    return result;
  }

  countRow(sheet: XLSX.WorkSheet) {
    if (!sheet['!ref']) return 0;
    const { row } = this.refRange(sheet['!ref']);
    return parseInt(row[1], 10) - parseInt(row[0], 10) + 1;
  }

  countColumn(sheet: XLSX.WorkSheet) {
    if (!sheet['!ref']) return 0;
    const { column } = this.refRange(sheet['!ref']);
    return parseColumnNum(column[1]) - parseColumnNum(column[0]) + 1;
  }

  private refRange(ref: string) {
    const [begin, end] = ref.split(':');
    const [beginColumn, beginRow] = begin.split(/(\d+)/, 2);
    const [endColumn, endRow] = end.split(/(\d+)/, 2);

    return {
      row: [beginRow, endRow],
      column: [beginColumn, endColumn],
    };
  }
}
