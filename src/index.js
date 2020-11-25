import _ from 'lodash';
import getObject from './parsers.js';

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const result = `{\n${keys1.reduce((acc, key) => {
    // ключа нет во втором файле
    if (_.findIndex(keys2, (el) => el === key) === (-1)) {
      return `${acc}- ${key}: ${object1[key]}\n`;
    }
    // значение ключа совпадают в обих файлах
    if (object1[key] === object2[key]) {
      return `${acc}  ${key}: ${object1[key]}\n`;
    }
    // значеие ключа отличается в файлах
    return `${acc}- ${key}: ${object1[key]}\n+ ${key}: ${object2[key]}\n`;
  }, '')}${keys2.reduce((acc, key) => {
    // ключа нет в первом файле
    if (_.findIndex(keys1, (el) => el === key) === (-1)) {
      return `${acc}+ ${key}: ${object2[key]}\n`;
    }
    return acc;
  }, '')}}`;
  return result;
};

const gendiff = (filepath1, filepath2) => {
  try {
    const object1 = getObject(filepath1);
    const object2 = getObject(filepath2);

    return getDiff(object1, object2);
  } catch (e) {
    console.log('что-то пошло не так!');
    console.log(e);
  }
  return -1;
};

export default gendiff;
