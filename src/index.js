import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import format from './formatters/index.js';

const getFileFullPath = (pathFile) => {
  const fullPath = pathFile[0] === '/'
    ? pathFile
    : path.resolve(process.cwd(), pathFile);
  return fullPath;
};

const getObject = (fullPathFile) => {
  const data = fs.readFileSync(fullPathFile, 'utf8');
  const fileFormat = path.extname(fullPathFile);
  // Выбирается функция-парсер в зависимости от расширения файла
  if (fileFormat === '.yml') {
    return yaml.safeLoad(data);
  }
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  throw new Error('Files of this type are not supported!!!');
};

const makeAst = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const result = {};

  keys1.forEach((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      result[key] = makeAst(object1[key], object2[key]);
    } else if (object1[key] === object2[key]) { // значение ключа совпадают в обих файлах
      result[key] = { status: 'equal', oldValue: object1[key], newValue: object2[key] };
    } else if (_.findIndex(keys2, (el) => el === key) === (-1)) { // ключа нет во втором файле
      result[key] = { status: 'removed', oldValue: object1[key], newValue: '' };
    } else { // значеие ключа отличается в файлах
      result[key] = { status: 'updated', oldValue: object1[key], newValue: object2[key] };
    }
  });

  keys2.forEach((key) => {
    if (_.findIndex(keys1, (el) => el === key) === (-1)) { // ключа нет в первом файле
      result[key] = { status: 'added', oldValue: '', newValue: object2[key] };
    }
  });

  return result;
};

const gendiff = (filepath1, filepath2, formatName) => {
  try {
    const object1 = getObject(getFileFullPath(filepath1));
    const object2 = getObject(getFileFullPath(filepath2));

    const ast = makeAst(object1, object2);
    return format(ast, formatName);
  } catch (e) {
    console.log('Что-то пошло не так!');
    console.error(`${e.name}:${e.message}`);
  }
  return -1;
};

export default gendiff;
