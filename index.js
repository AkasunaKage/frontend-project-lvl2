import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { parsers } from './parsers.js';


const getFileFormat = (filepath) => filepath.split('.').reverse()[0];

export const genDiff = (filepath1, filepath2) => {
  const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);
  const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf8');

  const readingFilepath1 = readFile(filepath1);
  const readingFilepath2 = readFile(filepath2);
  const file1 = parsers(readingFilepath1, getFileFormat(filepath1));
  const file2 = parsers(readingFilepath2, getFileFormat(filepath2));

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  
  const result = keys.sort().reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key]) {
        acc += ` ${key}: ${file1[key]}\n `;
    } else if (!_.has(file2, key)) {
        acc += ` - ${key}: ${file1[key]}\n `;
    } else if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
        acc += ` - ${key}: ${file1[key]}\n `;
        acc += ` + ${key}: ${file2[key]}\n `;
    } else {
        acc += ` + ${key}: ${file2[key]} `;
    }
    return acc;
}, '');

  return `{\n${result}\n}`;
};
