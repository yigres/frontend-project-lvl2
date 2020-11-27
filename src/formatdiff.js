export default (diff) => {
  const diffs = [];
  const keys = Object.keys(diff);

  keys.forEach((key) => diffs.push(`${key}: ${diff[key]}`));
  return `{\n${diffs.join('\n')}\n}`;
};
