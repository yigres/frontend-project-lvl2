import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  try {
    const object1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
    const object2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    const diff = `{\n${keys1.reduce((acc, key) => {
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
    }, '')}}\n`;

    // console.log(diff);
    return diff;
  } catch (e) {
    console.log('что-то пошло не так!');
  }
};

export default gendiff;
