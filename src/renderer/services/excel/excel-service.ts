import * as _ from 'lodash';
import * as XLSX from 'xlsx';

const NUMBER_CHAR = _.range(26).map((i) => String.fromCharCode(65 + i));
const CHAR_NUMBER = NUMBER_CHAR.reduce((p, c, i) => ((p[c] = i), p), {});

const NUMBER_C26 = _.range(26).map((i) => (i < 10 ? i.toString() : NUMBER_CHAR[i - 10]));
const C26_NUMBER = NUMBER_C26.reduce((p, c, i) => ((p[c] = i), p), {});

const parseColumnNum = (column: string) => {
  return parseInt(
    column
      .split('')
      .map((c) => NUMBER_C26[CHAR_NUMBER[c] + 1])
      .join(''),
    26
  );
};

const parseColumnChar = (number: number) => {
  return number
    .toString(26)
    .toUpperCase()
    .split('')
    .map((n) => NUMBER_CHAR[C26_NUMBER[n] - 1])
    .join('');
};

export class ExcelService {
  readRow(sheet: XLSX.WorkSheet, row: number, columns?: number) {
    if (!columns) columns = this.countColumn(sheet);
    const result: string[] = [];

    for (let i = 1; i <= columns; i++) {
      const fieldIndex = `${parseColumnChar(i)}${row}`;
      result.push(sheet[fieldIndex].v);
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
