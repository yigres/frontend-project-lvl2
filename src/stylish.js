const spaces = (count) => ' '.repeat(count * 4 + 2);

const formatValue = (value, level) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `\n${spaces(level + 1)}  ${key}: ${formatValue(value[key], level + 1)}`).join('');
    return `{${res}\n${' '.repeat((level + 1) * 4)}}`;
  }

  return value;
};

const iterAst = (ast, level = 0) => {
  const useStatusKey = (key) => {
    switch (ast[key].status) {
      case 'equal':
        return `${spaces(level)}  ${key}: ${formatValue(ast[key].oldValue, level)}`.trimRight();
      case 'added':
        return `${spaces(level)}+ ${key}: ${formatValue(ast[key].newValue, level)}`.trimRight();
      case 'deleted':
        return `${spaces(level)}- ${key}: ${formatValue(ast[key].oldValue, level)}`.trimRight();
      case 'changed':
        return [
          `${spaces(level)}- ${key}: ${formatValue(ast[key].oldValue, level)}`.trimRight(),
          `\n${spaces(level)}+ ${key}: ${formatValue(ast[key].newValue, level)}`.trimRight(),
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
      return `${spaces(level)}  ${key}: ${iterAst(ast[key], level + 1)}`;
    }

    return useStatusKey(key);
  }).join('\n');

  return `{\n${res}\n${' '.repeat(level * 4)}}`;
};

export default iterAst;
