import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import buildTree from './buildTree.js';
import parse from './parse.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).slice(1);

const getFilePath = (filepath) => resolve(process.cwd(), filepath).trim();

const readFileContent = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const readContent1 = readFileContent(filepath1);
  const readContent2 = readFileContent(filepath2);
  const file1 = parse(readContent1, getFileFormat(filepath1));
  const file2 = parse(readContent2, getFileFormat(filepath2));

  const diffTree = buildTree(file1, file2);

  return getFormat(diffTree, format);
};

export default genDiff;
