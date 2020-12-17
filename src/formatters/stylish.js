const spaces = (count = 0) => ' '.repeat(count * 4 + 2);

const toString = (value, depth) => {
  if (value && typeof value === 'object') {
    const res = Object.keys(value).map((key) => `\n${spaces(depth + 1)}  ${key}: ${toString(value[key], depth + 1)}`).join('');
    return `{${res}\n${' '.repeat((depth + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, depth = 0) => {
  const res = ast.map((node) => {
    if (node.type === 'nested') {
      return `${spaces(depth)}  ${node.name}: ${iterAst(node.children, depth + 1)}`;
    }

    switch (node.type) {
      case 'equal':
        return `${spaces(depth)}  ${node.name}: ${toString(node.value, depth)}`;
      case 'added':
        return `${spaces(depth)}+ ${node.name}: ${toString(node.value, depth)}`;
      case 'removed':
        return `${spaces(depth)}- ${node.name}: ${toString(node.value, depth)}`;
      case 'updated':
        return [
          `${spaces(depth)}- ${node.name}: ${toString(node.oldValue, depth)}`,
          `\n${spaces(depth)}+ ${node.name}: ${toString(node.newValue, depth)}`,
        ].join('');
      default:
        throw new Error(`Unkown node type: '${node.type}'`);
    }
  }).join('\n');

  return `{\n${res}\n${' '.repeat(depth * 4)}}`;
};

export default iterAst;
