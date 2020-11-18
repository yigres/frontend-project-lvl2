#!/usr/bin/env node

import program from 'commander';

program
  .version('1.1.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

// program.parse(process.argv);
// program.help();
