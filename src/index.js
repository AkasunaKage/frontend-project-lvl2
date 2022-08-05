import path from 'path';
import fs from 'fs';
import buildTree from './buildTree.js';
import { parsers } from './parsers.js';
import { extname } from 'path';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).slice(1);



export const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);
  const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf8');

  const readingFilepath1 = readFile(filepath1);
  const readingFilepath2 = readFile(filepath2);
  const file1 = parsers(readingFilepath1, getFileFormat(filepath1));
  const file2 = parsers(readingFilepath2, getFileFormat(filepath2));

  const diffTree = buildTree(file1, file2);

  return getFormat(diffTree, format);
};
