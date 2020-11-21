#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';

program
  .version('1.1.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });

program.parse(process.argv);

export default gendiff;
