import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import format from './formatters/index.js';

const parseData = (data, fileFormat) => {
  // Выбирается функция-парсер в зависимости от расширения файла
  if (fileFormat === '.yml') {
    return yaml.safeLoad(data);
  }

  return JSON.parse(data);
};

const makeAst = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  const keys = _.union(keysOfObject1, keysOfObject2);
  const result = {};

  keys.forEach((key) => {
    if (
      object1[key] && object2[key]
      && _.isPlainObject(object1[key]) && _.isPlainObject(object2[key])
    ) {
      result[key] = makeAst(object1[key], object2[key]);
    } else if (object1[key] === object2[key]) {
      // значение ключа совпадают в обих файлах
      result[key] = {
        status: 'equal',
        oldValue: object1[key],
        newValue: object2[key],
      };
    } else if (!_.includes(keysOfObject2, key)) {
      // ключа нет во втором файле
      result[key] = {
        status: 'removed',
        oldValue: object1[key],
        newValue: '',
      };
    } else if (!_.includes(keysOfObject1, key)) {
      // ключа нет в первом файле
      result[key] = {
        status: 'added',
        oldValue: '',
        newValue: object2[key],
      };
    } else {
      // значеие ключа отличается в файлах
      result[key] = {
        status: 'updated',
        oldValue: object1[key],
        newValue: object2[key],
      };
    }
  });

  return result;
};

const gendiff = (filepath1, filepath2, formatName) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  try {
    const data1 = fs.readFileSync(fullPath1, 'utf8');
    const data2 = fs.readFileSync(fullPath2, 'utf8');

    const fileFormat1 = path.extname(fullPath1);
    const fileFormat2 = path.extname(fullPath2);

    const object1 = parseData(data1, fileFormat1);
    const object2 = parseData(data2, fileFormat2);

    const ast = makeAst(object1, object2);
    return format(ast, formatName);
  } catch (e) {
    console.log('Что-то пошло не так!');
    console.log(e);
  }

  return -1;
};

export default gendiff;
