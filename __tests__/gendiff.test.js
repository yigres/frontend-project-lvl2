import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected from '../__fixtures__/expected_file.js';
import expected1 from '../__fixtures__/expected_file1.js';
import expected2 from '../__fixtures__/expected_file2.js';
import expected3 from '../__fixtures__/expected_file3.js';
import expected4 from '../__fixtures__/expected_file4.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path5 = getFixturePath('file5.json');
const path6 = getFixturePath('file6.json');
const path7 = getFixturePath('file7.yml');
const path8 = getFixturePath('file8.yml');

test('generate "stylish" format difference for two deep json files', () => {
  expect(gendiff(path5, path6, 'stylish')).toBe(expected1);
});

test('generate "stylish" format difference for two deep yml files', () => {
  expect(gendiff(path7, path8, 'stylish')).toBe(expected1);
});

test('generate "plain" format difference for two plain jsom files', () => {
  expect(gendiff(path1, path2, 'plain')).toBe(expected);
});

test('generate "plain" format difference for two deep jsom files', () => {
  expect(gendiff(path5, path6, 'plain')).toBe(expected2);
});

test('generate "plain" format difference for two deep yml files', () => {
  expect(gendiff(path7, path8, 'plain')).toBe(expected2);
});

test('generate "json" format difference for two plain jsom files', () => {
  expect(gendiff(path1, path2, 'json')).toBe(expected4);
});

test('generate "json" format difference for two deep jsom files', () => {
  expect(gendiff(path5, path6, 'json')).toBe(expected3);
});

test('generate "json" format difference for two deep yml files', () => {
  expect(gendiff(path7, path8, 'json')).toBe(expected3);
});
