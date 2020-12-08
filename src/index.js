import _ from 'lodash';
import getObject from './parsers.js';
import format from './formatters/index.js';

const isOject = (obj) => obj && (typeof obj === 'object') && !Array.isArray(obj);

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const result = {};

  keys1.forEach((key) => {
    if (isOject(object1[key]) && isOject(object2[key])) {
      result[key] = getDiff(object1[key], object2[key]);
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
    const object1 = getObject(filepath1);
    const object2 = getObject(filepath2);

    const ast = getDiff(object1, object2);
    return format(ast, formatName);
  } catch (e) {
    console.log('что-то пошло не так!');
    console.log(e);
  }
  return -1;
};

export default gendiff;
