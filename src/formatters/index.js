import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (ast, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      // nothing
  }
  return stylish(ast);
};

export default format;
