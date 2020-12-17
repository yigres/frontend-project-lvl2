const currentIndent = (depth) => {
  const indentSize = 4 * (depth) + 2;
  return ' '.repeat(indentSize);
};

const bracketIndent = (depth) => {
  const indentSize = 4 * depth;
  return ' '.repeat(indentSize);
};

const toString = (value, depth) => {
  if (value && typeof value === 'object') {
    const lines = Object.keys(value)
      .map((key) => `${currentIndent(depth)}  ${key}: ${toString(value[key], depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  }

  return value;
};

const iterAst = (ast) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      switch (node.type) {
        case 'equal':
          return `${currentIndent(depth)}  ${node.name}: ${toString(node.value, depth + 1)}`;
        case 'added':
          return `${currentIndent(depth)}+ ${node.name}: ${toString(node.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent(depth)}- ${node.name}: ${toString(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${currentIndent(depth)}- ${node.name}: ${toString(node.oldValue, depth + 1)}`,
            `${currentIndent(depth)}+ ${node.name}: ${toString(node.newValue, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${currentIndent(depth)}  ${node.name}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unkown node type: '${node.type}'`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  };

  return iter(ast, 0);
};

export default iterAst;
