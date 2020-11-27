import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = () => JSON.parse(fs.readFileSync(getFixturePath('expected_file.json')));

//   const result = `{${Object.entries(JSON.parse(readJsonFile)).reduce((acc,
//   [a, b]) => `${acc}\n${a}: ${b}`, '')}\n}`;
//   return result;
// };

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file3.yml');
const path4 = getFixturePath('file4.yml');

test('generate difference for two json files', () => {
  expect(gendiff(path1, path2)).toEqual(expectedResult());
});

test('generate difference for two yaml files', () => {
  expect(gendiff(path3, path4)).toEqual(expectedResult());
});

// test('generate difference for two deep files', () => {
//   expect(gendiff(path5, path6)).toBe(expectedString());
// });
