/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import { genDiff } from '../src/index.js';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', 'fixtures', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


const expectedStylish = readFile('stylish_res.txt');

const expectedPlain = readFile('plain_res.txt');

const formatsFiles = ['json', 'yaml', 'yml'];

test.each(formatsFiles)('diff formats of files (.json .yaml .yml)', (extension) => {
  const file1 = `${process.cwd()}/fixtures/file1.${extension}`;
  const file2 = `${process.cwd()}/fixtures/file2.${extension}`;

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
});