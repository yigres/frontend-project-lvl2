import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import makeAst from './makeAST.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(fullPath1, 'utf8');
  const data2 = fs.readFileSync(fullPath2, 'utf8');

  const fileFormat1 = path.extname(fullPath1);
  const fileFormat2 = path.extname(fullPath2);

  const object1 = parse(data1, fileFormat1);
  const object2 = parse(data2, fileFormat2);

  const ast = makeAst(object1, object2);
  return format(ast, formatName);
};

export default gendiff;
