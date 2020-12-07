import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';
import expected from '../__fixtures__/expected_file2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const path5 = getFixturePath('file5.json');
const path6 = getFixturePath('file6.json');
const path7 = getFixturePath('file7.yml');
const path8 = getFixturePath('file8.yml');

test('generate difference for two deep json files', () => {
  expect(stylish(gendiff(path5, path6))).toBe(expected);
});

test('generate difference for two deep yml files', () => {
  expect(stylish(gendiff(path7, path8))).toBe(expected);
});
