import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';

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

const getPath = (filePath) => {
    if (path.isAbsolute(filePath)) {
      return filePath;
    }
    return path.resolve(process.cwd(), filePath).trim();
  };

const getFiles = (file1, file2) => {
        const data1 = JSON.parse(readFileSync(getPath(file1)));
        const data2 = JSON.parse(readFileSync(getPath(file2)));
        return [data1, data2];
      };
      

export { getPath, getFiles };