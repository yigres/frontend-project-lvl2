#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import gendiff from '../index.js';
import stylish from '../src/stylish.js';

program
  .version('1.1.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const fullPath1 = path.resolve(process.cwd(), filePath1);
    const fullPath2 = path.resolve(process.cwd(), filePath2);
    console.log('- %s output format', program.format);
    if (program.format === 'stylish') {
      const ast = gendiff(fullPath1, fullPath2);
      console.log(stylish(ast));
    } else {
      console.log('wrong format!!!');
    }
    // console.log('!ast ===');
    // console.log(ast);
    // console.log(format(ast));
  });

program.parse(process.argv);

export default gendiff;
