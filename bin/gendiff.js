#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .version('1.1.4')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2, program.format));
  });

program.parse(process.argv);
