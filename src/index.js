import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import buildTree from './buildTree.js';
import parse from './parse.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => extname(filepath).slice(1);

const getFilePath = (filepath) => resolve(process.cwd(), filepath).trim();

const readFileContent = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileContent1 = readFileContent(filepath1);
  const fileContent2 = readFileContent(filepath2);
  const data1 = parse(fileContent1, getFileFormat(filepath1));
  const data2 = parse(fileContent2, getFileFormat(filepath2));

  const diffTree = buildTree(data1, data2);

  return getFormat(diffTree, format);
};

export default genDiff;
