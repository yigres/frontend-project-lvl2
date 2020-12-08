const formatValue = (value) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `"${key}":${formatValue(value[key])}`).join(',');
    return `{${res}}`;
  }
  return (typeof (value) === 'string' ? `"${value}"` : `${value}`);
};

const iterAst = (ast) => {
  const useStatusKey = (key) => {
    switch (ast[key].status) {
      case 'equal':
        return `"${key}":${formatValue(ast[key].oldValue)}`.trimRight();
      case 'added':
        return `"+ ${key}":${formatValue(ast[key].newValue)}`.trimRight();
      case 'removed':
        return `"- ${key}":${formatValue(ast[key].oldValue)}`.trimRight();
      case 'updated':
        return [
          `"- ${key}":${formatValue(ast[key].oldValue)},`.trimRight(),
          `"+ ${key}":${formatValue(ast[key].newValue)}`.trimRight(),
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
      return `"${key}":${iterAst(ast[key])}`;
    }

    return useStatusKey(key);
  }).join(',');
  return `{${res}}`;
};

export default iterAst;
