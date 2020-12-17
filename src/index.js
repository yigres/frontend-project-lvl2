import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import format from './formatters/index.js';

const mapping = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parse = (data, fileFormat) => mapping[fileFormat](data);

const makeAst = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  return keys.map((key) => {
    if (!_.has(object2, key)) {
      return {
        name: key,
        type: 'removed',
        value: object1[key],
      };
    }
    if (!_.has(object1, key)) {
      return {
        name: key,
        type: 'added',
        value: object2[key],
      };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        name: key,
        type: 'nested',
        children: makeAst(object1[key], object2[key]),
      };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return {
        name: key,
        type: 'equal',
        value: object1[key],
      };
    }
    return {
      name: key,
      type: 'updated',
      oldValue: object1[key],
      newValue: object2[key],
    };
  });
};

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
