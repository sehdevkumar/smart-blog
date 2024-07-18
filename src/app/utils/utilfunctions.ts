/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import _ from 'lodash';
import * as jssha from 'jssha';
export function isNullOrUndef(obj: any) {
  return obj === null || obj === undefined;
}

export function getStr(data: any): string {
  return (data as string)?.toString()?.trim();
}

export function getStrLower(data: any): string {
  return getStr(data)?.toLowerCase();
}

export function strCmp(str1: any, str2: any): boolean {
  return getStrLower(str1) === getStrLower(str2);
}

export function isPropEmpty(val: any): boolean {
  return (
    isNullOrUndef(val) ||
    (typeof val === 'number' && val < 0) ||
    (typeof val === 'string' && !val?.trim()?.length) ||
    (Array.isArray(val) && !val?.filter(Boolean)?.length) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    (typeof val === 'boolean' && val !== true && _.isEmpty(val))
  );
}


export function flattenObject(obj: any): any {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}


export function handleTableCellData(val: any): any {
  if (isPropEmpty(val)) {
    return '―';
  } else {
    return val;
  }
}


export function getDateTime(timeStamp: number): { date: string; time: string } {
  const dateTime = new Date(timeStamp);

  const year = dateTime?.getFullYear();
  const month = dateTime?.getMonth() + 1;
  const day = dateTime?.getDate();
  const hr = dateTime?.getHours();
  const min = dateTime?.getMinutes();

  const date = `${day}-${month}-${year}`;
  const time = `${hr}:${min}`;

  return { date, time };
}


export function getHashedString(str: string) {
  return new jssha.default('SHA-512', 'TEXT').update(str).getHash('HEX');
}