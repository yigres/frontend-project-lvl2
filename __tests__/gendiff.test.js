import { test, expect } from '@jest/globals';
import gendiff from '../index';

const path1 = '__fixtures__/file1.json';
const path2 = '__fixtures__/file2.json';
const diff = '{\n  host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}\n';
test('generate difference two json files', () => {
  expect(gendiff(path1, path2)).toBe(diff);
});
