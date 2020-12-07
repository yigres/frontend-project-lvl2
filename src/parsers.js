import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (fullPathFile) => {
  const data = fs.readFileSync(fullPathFile, 'utf8');
  const format = path.extname(fullPathFile);
  let result;
  // Выбирается функция-парсер в зависимости от расширения файла
  if (format === '.yml') {
    result = yaml.safeLoad(data);
  } else if (format === '.json') {
    result = JSON.parse(data);
  }

  return result;
};
