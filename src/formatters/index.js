import stylish from './stylish';
import plain from './plain';
import json from './json';

const mapping = {
  stylish,
  plain,
  json,
};

const format = (ast, outFormat) => mapping[outFormat](ast);

export default format;
