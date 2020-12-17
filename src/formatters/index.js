import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (ast, outFormat = 'stylish') => {
  switch (outFormat) {
    case 'stylish': return stylish(ast);
    case 'plain': return plain(ast);
    case 'json': return json(ast);
    default:
      throw new Error(`check the output format: ${outFormat}`);
  }
};

export default format;
