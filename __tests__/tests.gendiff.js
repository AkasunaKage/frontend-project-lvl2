/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import { genDiff } from './src/index.js';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', 'fixtures', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected = readFile('stylish_res.txt');

const actualYaml = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
const expectedYaml = readFile('stylish_res.txt');

test('getDiff', () => {
  expect(actual).toEqual(expected);
  expect(actualYaml).toEqual(expectedYaml);
});