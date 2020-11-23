import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getStringResult = () => {
  const readJsonFile = fs.readFileSync(getFixturePath('expected_file.json'));
  const stringFile = `{${Object.entries(JSON.parse(readJsonFile)).reduce((acc, [a, b]) => `${acc}\n${a}: ${b}`, '')}\n}\n`;
  return stringFile;
};

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test('generate difference two json files', () => {
  expect(gendiff(path1, path2)).toBe(getStringResult());
});
