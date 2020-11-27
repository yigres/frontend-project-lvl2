import _ from 'lodash';
import getObject from './parsers.js';

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const result = {};

  keys1.forEach((key) => {
    if (object1[key] === object2[key]) { // значение ключа совпадают в обих файлах
      const keyName = `  ${key}`;
      result[keyName] = object1[key];
    } else if (_.findIndex(keys2, (el) => el === key) === (-1)) { // ключа нет во втором файле
      const keyName = `- ${key}`;
      result[keyName] = object1[key];
    } else { // значеие ключа отличается в файлах
      const keyName1 = `- ${key}`;
      const keyName2 = `+ ${key}`;
      result[keyName1] = object1[key];
      result[keyName2] = object2[key];
    }
  });

  keys2.forEach((key) => {
    if (_.findIndex(keys1, (el) => el === key) === (-1)) { // ключа нет в первом файле
      const keyName = `+ ${key}`;
      result[keyName] = object2[key];
    }
  });
  // console.log(result);
  return result;
};

const gendiff = (filepath1, filepath2) => {
  try {
    const object1 = getObject(filepath1);
    const object2 = getObject(filepath2);
    // console.log(object1, object2);

    return getDiff(object1, object2);
  } catch (e) {
    console.log('что-то пошло не так!');
    console.log(e);
  }
  return -1;
};

export default gendiff;
