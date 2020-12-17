const newPath = (value, path) => (path === ''
  ? value
  : `${path}.${value}`);

const toString = (value) => {
  if (value && typeof value === 'object') {
    return '[complex value]';
  }
  return (typeof (value) === 'string' ? `'${value}'` : value);
};

const iterAst = (ast, path = '') => {
  const res = ast.map((node) => {
    if (node.type === 'nested') {
      return iterAst(node.children, newPath(node.name, path));
    }

    switch (node.type) {
      case 'equal':
        return '';
      case 'added':
        return `Property '${newPath(node.name, path)}' was added with value: ${toString(node.value)}`;
      case 'removed':
        return `Property '${newPath(node.name, path)}' was removed`;
      case 'updated':
        return `Property '${newPath(node.name, path)}' was updated. From ${toString(node.oldValue)} to ${toString(node.newValue)}`;
      default:
        throw new Error(`Unkown node type: '${node.type}'`);
    }
  }).filter(Boolean).join('\n');

  return res;
};

export default iterAst;
