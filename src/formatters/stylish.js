import _ from 'lodash';

const spaces = (count) => ' '.repeat(count * 4 + 2);

const formatValue = (value, level) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `\n${spaces(level + 1)}  ${key}: ${formatValue(value[key], level + 1)}`).join('');
    return `{${res}\n${' '.repeat((level + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, depth = 0) => {
  const parse = (node) => {
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
        // nothing
    }
    return -1;
  };

  const res = ast.map((node) => {
    if (_.has(node, 'children')) {
      return `${spaces(depth)}  ${node.name}: ${iterAst(node.children, depth + 1)}`;
    }

    return parse(node);
  }).join('\n');

  return `{\n${res}\n${' '.repeat(depth * 4)}}`;
};

export default iterAst;
