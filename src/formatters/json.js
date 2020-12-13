import _ from 'lodash';

const formatValue = (value) => {
  if (value instanceof Object) {
    const res = Object.keys(value).map((key) => `"${key}":${formatValue(value[key])}`).join(',');
    return `{${res}}`;
  }
  return (typeof (value) === 'string' ? `"${value}"` : `${value}`);
};

const iterAst = (ast) => {
  const render = (node) => {
    switch (node.type) {
      case 'equal':
        return `"${node.name}":${formatValue(node.oldValue)}`.trimRight();
      case 'added':
        return `"+ ${node.name}":${formatValue(node.newValue)}`.trimRight();
      case 'removed':
        return `"- ${node.name}":${formatValue(node.oldValue)}`.trimRight();
      case 'updated':
        return [
          `"- ${node.name}":${formatValue(node.oldValue)},`.trimRight(),
          `"+ ${node.name}":${formatValue(node.newValue)}`.trimRight(),
        ].join('');
      default:
        // nothing
    }
    return -1;
  };

  const res = ast.map((node) => {
    if (_.has(node, 'children')) {
      return `"${node.name}":${iterAst(node.children)}`;
    }

    return render(node);
  }).join(',');
  return `{${res}}`;
};

export default iterAst;
