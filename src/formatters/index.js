import stylish from './stylish.js';
import plain from './plain.js';

const format = (ast, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(ast);
    default:
      // nothing
  }
  return stylish(ast);
};

export default format;
