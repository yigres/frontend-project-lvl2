import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index';
import expected1 from '../__fixtures__/expected_file1';
import expected2 from '../__fixtures__/expected_file2';
import expected3 from '../__fixtures__/expected_file3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, extension) => path.join(__dirname, '..', '__fixtures__', `${filename}.${extension}`);

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
