// const { values } = require("lodash");

const iterAst = (ast, path = '') => {
  const formatValue = (value) => {
    if (value instanceof Object) {
      return '[complex value]';
    }
    return (typeof (value) === 'string' ? `'${value}'` : value);
  };

  const newPath = (key) => (path === ''
    ? key
    : `${path}.${key}`);

  const useStatusKey = (key) => {
    switch (ast[key].status) {
      case 'added':
        return `Property '${newPath(key)}' was added with value: ${formatValue(ast[key].newValue)}`;
      case 'removed':
        return `Property '${newPath(key)}' was removed`;
      case 'updated':
        return `Property '${newPath(key)}' was updated. From ${formatValue(ast[key].oldValue)} to ${formatValue(ast[key].newValue)}`;
      default:
        // nothing
    }
    return null;
  };
  const keys = Object.keys(ast).sort();
  const res = keys.map((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!ast[key].hasOwnProperty('status')) {
      return iterAst(ast[key], newPath(key));
    }

    return useStatusKey(key);
  }).filter(Boolean).join('\n');

  return res;
};

export default iterAst;
