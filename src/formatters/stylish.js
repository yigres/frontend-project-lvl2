const spaces = (count) => ' '.repeat(count * 4 + 2);

const formatValue = (value, level) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `\n${spaces(level + 1)}  ${key}: ${formatValue(value[key], level + 1)}`).join('');
    return `{${res}\n${' '.repeat((level + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, depth = 0) => {
  const useStatusKey = (key) => {
    switch (ast[key].status) {
      case 'equal':
        return `${spaces(depth)}  ${key}: ${formatValue(ast[key].oldValue, depth)}`.trimRight();
      case 'added':
        return `${spaces(depth)}+ ${key}: ${formatValue(ast[key].newValue, depth)}`.trimRight();
      case 'removed':
        return `${spaces(depth)}- ${key}: ${formatValue(ast[key].oldValue, depth)}`.trimRight();
      case 'updated':
        return [
          `${spaces(depth)}- ${key}: ${formatValue(ast[key].oldValue, depth)}`.trimRight(),
          `\n${spaces(depth)}+ ${key}: ${formatValue(ast[key].newValue, depth)}`.trimRight(),
        ].join('');
      default:
        // nothing
    }
    return -1;
  };
  const keys = Object.keys(ast).sort();
  const res = keys.map((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!ast[key].hasOwnProperty('status')) {
      return `${spaces(depth)}  ${key}: ${iterAst(ast[key], depth + 1)}`;
    }

    return useStatusKey(key);
  }).join('\n');

  return `{\n${res}\n${' '.repeat(depth * 4)}}`;
};

export default iterAst;
