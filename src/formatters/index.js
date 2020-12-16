import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const mapping = {
  stylish,
  plain,
  json,
};

const format = (ast, outFormat) => mapping[outFormat](ast);

export default format;
