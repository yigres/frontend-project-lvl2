import yaml from 'js-yaml';

const mapping = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parse = (data, fileFormat) => mapping[fileFormat](data);

export default parse;
