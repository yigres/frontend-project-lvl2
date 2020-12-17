const iterAst = (ast, path = '') => {
  const renderValue = (value) => {
    if (value && typeof value === 'object') {
      return '[complex value]';
    }
    return (typeof (value) === 'string' ? `'${value}'` : value);
  };

  const newPath = (value) => (path === ''
    ? value
    : `${path}.${value}`);

  const render = (node) => {
    switch (node.type) {
      case 'equal':
        return '';
      case 'added':
        return `Property '${newPath(node.name)}' was added with value: ${renderValue(node.value)}`;
      case 'removed':
        return `Property '${newPath(node.name)}' was removed`;
      case 'updated':
        return `Property '${newPath(node.name)}' was updated. From ${renderValue(node.oldValue)} to ${renderValue(node.newValue)}`;
      default:
        throw new Error(`Unkown node type: '${node.type}'`);
    }
  };

  const res = ast.map((node) => {
    if (node.type === 'nested') {
      return iterAst(node.children, newPath(node.name));
    }

    return render(node);
  }).filter(Boolean).join('\n');

  return res;
};

export default iterAst;
