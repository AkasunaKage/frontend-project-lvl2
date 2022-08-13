import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import buildTree from './buildTree.js';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).slice(1);

const getFilePath = (filepath) => resolve(process.cwd(), filepath).trim();

const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');

  const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const readFilepath1 = readFile(filepath1);
  const readFilepath2 = readFile(filepath2);
  const file1 = parsers(readFilepath1, getFileFormat(filepath1));
  const file2 = parsers(readFilepath2, getFileFormat(filepath2));

  const diffTree = buildTree(file1, file2);

  return getFormat(diffTree, format);
};

export default genDiff;