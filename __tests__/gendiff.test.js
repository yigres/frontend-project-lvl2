import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, extension) => path.join(__dirname, '..', '__fixtures__', `${filename}.${extension}`);

const expected1 = fs.readFileSync(getFixturePath('expected_file1', 'txt'), 'utf8');
const expected2 = fs.readFileSync(getFixturePath('expected_file2', 'txt'), 'utf8');
const expected3 = fs.readFileSync(getFixturePath('expected_file3', 'txt'), 'utf8');

const testArray = [
  ['stylish', 'json', 'file5', 'file6', expected1],
  ['stylish', 'yml', 'file7', 'file8', expected1],
  ['plain', 'json', 'file5', 'file6', expected2],
  ['plain', 'yml', 'file7', 'file8', expected2],
  ['json', 'json', 'file5', 'file6', expected3],
  ['json', 'yml', 'file7', 'file8', expected3],
];

test.concurrent.each(testArray)('generate "%s" format difference for two deep %s files', async (outputFormat, filesFormat, fileName1, fileName2, expected) => {
  const path1 = getFixturePath(fileName1, filesFormat);
  const path2 = getFixturePath(fileName2, filesFormat);

  expect(gendiff(path1, path2, outputFormat)).toBe(expected);
});
