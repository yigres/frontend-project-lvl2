import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected1 from '../__fixtures__/expected_file1.js';
import expected2 from '../__fixtures__/expected_file2.js';
import expected3 from '../__fixtures__/expected_file3.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const path5 = getFixturePath('file5.json');
const path6 = getFixturePath('file6.json');
const path7 = getFixturePath('file7.yml');
const path8 = getFixturePath('file8.yml');

const testArray = [
  ['stylish', 'json', path5, path6, expected1],
  ['stylish', 'yml', path7, path8, expected1],
  ['plain', 'json', path5, path6, expected2],
  ['plain', 'yml', path7, path8, expected2],
  ['json', 'json', path5, path6, expected3],
  ['json', 'yml', path7, path8, expected3],
];

test.concurrent.each(testArray)('generate "%s" format difference for two deep %s files', async (outputFormat, filesFormat, path1, path2, expected) => {
  expect(gendiff(path1, path2, outputFormat)).toBe(expected);
});
