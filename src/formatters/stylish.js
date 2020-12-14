const spaces = (count) => ' '.repeat(count * 4 + 2);

const formatValue = (value, level) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `\n${spaces(level + 1)}  ${key}: ${formatValue(value[key], level + 1)}`).join('');
    return `{${res}\n${' '.repeat((level + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, depth = 0) => {
  const render = (node) => {
    switch (node.type) {
      case 'equal':
        return `${spaces(depth)}  ${node.name}: ${formatValue(node.oldValue, depth)}`.trimRight();
      case 'added':
        return `${spaces(depth)}+ ${node.name}: ${formatValue(node.newValue, depth)}`.trimRight();
      case 'removed':
        return `${spaces(depth)}- ${node.name}: ${formatValue(node.oldValue, depth)}`.trimRight();
      case 'updated':
        return [
          `${spaces(depth)}- ${node.name}: ${formatValue(node.oldValue, depth)}`.trimRight(),
          `\n${spaces(depth)}+ ${node.name}: ${formatValue(node.newValue, depth)}`.trimRight(),
        ].join('');
      default:
        throw new Error(`Unkown node type: '${node.type}'`);
    }
  };

  const res = ast.map((node) => {
    if (node.type === 'node') {
      return `${spaces(depth)}  ${node.name}: ${iterAst(node.children, depth + 1)}`;
    }

    return render(node);
  }).join('\n');

  return `{\n${res}\n${' '.repeat(depth * 4)}}`;
};

export default iterAst;
