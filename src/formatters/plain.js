import _ from 'lodash';

const iterAst = (ast, path = '') => {
  const formatValue = (value) => {
    if (value instanceof Object) {
      return '[complex value]';
    }
    return (typeof (value) === 'string' ? `'${value}'` : value);
  };

  const newPath = (value) => (path === ''
    ? value
    : `${path}.${value}`);

  const parse = (node) => {
    switch (node.type) {
      case 'added':
        return `Property '${newPath(node.name)}' was added with value: ${formatValue(node.newValue)}`;
      case 'removed':
        return `Property '${newPath(node.name)}' was removed`;
      case 'updated':
        return `Property '${newPath(node.name)}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      default:
        // nothing
    }
    return null;
  };

  const res = ast.map((node) => {
    if (_.has(node, 'children')) {
      return iterAst(node.children, newPath(node.name));
    }

    return parse(node);
  }).filter(Boolean).join('\n');

  return res;
};

export default iterAst;
