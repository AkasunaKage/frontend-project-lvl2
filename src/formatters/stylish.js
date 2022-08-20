import _ from 'lodash';

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object.entries(data)
    .map(([key, value]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${makeIndent(depth)}  }`,
  ].join('\n');
};

const sign = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const makeStylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const makeLine = (value, mark) => `${makeIndent(depth)}${mark} ${node.name}: ${stringify(value, depth)}\n`;

    switch (node.type) {
      case 'added':
        return makeLine(node.value, sign.added);
      case 'deleted':
        return makeLine(node.value, sign.deleted);
      case 'unchanged':
        return makeLine(node.value, sign.unchanged);
      case 'changed':
        return `${makeLine(node.firstValue, sign.deleted)}${makeLine(node.secondValue, sign.added)}`;
      case 'nested':
        return `${makeIndent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1).join('')}${makeIndent(depth)}  }\n`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  return `{\n${iter(diff, 1).join('')}}`;
};

export default makeStylish;
