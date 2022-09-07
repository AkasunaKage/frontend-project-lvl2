import { dirname, resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testCases = [
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'stylish', expectedFileName: 'stylish_res.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yaml', formatter: 'stylish', expectedFileName: 'stylish_res.txt',
  },
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'plain', expectedFileName: 'plain_res.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yaml', formatter: 'plain', expectedFileName: 'plain_res.txt',
  },
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'json', expectedFileName: 'json_res.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yaml', formatter: 'json', expectedFileName: 'json_res.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yaml', formatter: undefined, expectedFileName: 'stylish_res.txt',
  },
];

test.each(testCases)('diff formats of files (.json .yaml .yml)', ({
  fileName1, fileName2, formatter, expectedFileName,
}) => {
  const filepath1 = getFixturePath(fileName1);
  const filepath2 = getFixturePath(fileName2);
  const expected = readFile(expectedFileName);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
});
