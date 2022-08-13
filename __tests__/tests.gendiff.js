/* eslint-disable no-undef */
import { dirname, resolve } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('stylish_res.txt');

const expectedPlain = readFile('plain_res.txt');

const expectedJson = readFile('json_res.txt');

const formatsFiles = ['json', 'yaml', 'yml'];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', (extension) => {
  const file1 = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const file2 = `${process.cwd()}/__fixtures__/file2.${extension}`;

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
});
