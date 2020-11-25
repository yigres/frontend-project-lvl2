#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import gendiff from '../index.js';

program
  .version('1.1.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    const fullPath1 = path.resolve(process.cwd(), filePath1);
    const fullPath2 = path.resolve(process.cwd(), filePath2);
    console.log(gendiff(fullPath1, fullPath2));
  });

program.parse(process.argv);

export default gendiff;
