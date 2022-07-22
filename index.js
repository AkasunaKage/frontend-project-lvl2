import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';

export const genDiff = (file1, file2) => {
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

export default (filepath1, filepath2) => {
const parsing1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1)));
const parsing2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2)));
return genDiff(parsing1, parsing2);
};