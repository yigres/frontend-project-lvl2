#!/usr/bin/env node

import program from 'commander';

program
  .version('1.1.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
  });

program.parse(process.argv);

// if (program.format) console.log('- output format');
// program.help();
