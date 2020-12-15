const spaces = (count = 0) => ' '.repeat(count * 4 + 2);

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `\n${spaces(depth + 1)}  ${key}: ${renderValue(value[key], depth + 1)}`).join('');
    return `{${res}\n${' '.repeat((depth + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, depth = 0) => {
  const render = (node) => {
    switch (node.type) {
      case 'equal':
        return `${spaces(depth)}  ${node.name}: ${renderValue(node.value, depth)}`.trimRight();
      case 'added':
        return `${spaces(depth)}+ ${node.name}: ${renderValue(node.value, depth)}`.trimRight();
      case 'removed':
        return `${spaces(depth)}- ${node.name}: ${renderValue(node.value, depth)}`.trimRight();
      case 'updated':
        return [
          `${spaces(depth)}- ${node.name}: ${renderValue(node.oldValue, depth)}`.trimRight(),
          `\n${spaces(depth)}+ ${node.name}: ${renderValue(node.newValue, depth)}`.trimRight(),
        ].join('');
      default:
        throw new Error(`Unkown node type: '${node.type}'`);
    }
  };

  const res = ast.map((node) => {
    if (node.type === 'nested') {
      return `${spaces(depth)}  ${node.name}: ${iterAst(node.children, depth + 1)}`;
    }

    return render(node);
  }).join('\n');

  return `{\n${res}\n${' '.repeat(depth * 4)}}`;
};

export default iterAst;
