/* eslint-disable no-undef */
import { dirname, resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formatsFiles = [
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'stylish', check: 'stylish_res.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'stylish', check: 'stylish_res.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'plain', check: 'plain_res.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'plain', check: 'plain_res.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'json', check: 'json_res.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'json', check: 'json_res.txt',
  },
];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', ({
  file1, file2, formatter, check,
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(check);
  const expectedDefault = readFile(getFixturePath('stylish_res.txt'));
  const result = genDiff(filepath1, filepath2, formatter);
  const resultDefaultFormatter = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
  expect(resultDefaultFormatter).toEqual(expectedDefault);
});
