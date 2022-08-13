import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indForKey = replacer.repeat(depth + 1);
  const indForBracket = replacer.repeat(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indForKey}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{', ...lines, `${indForBracket}}`].join('\n');
};

const sign = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const makeStylish = (diff, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const ind = replacer.repeat(depth);
    const indForSign = ind.slice(2);

    const makeLine = (value, mark) => `${indForSign}${mark} ${node.name}: ${stringify(value, depth, replacer)}`;

    switch (node.type) {
      case 'added':
        return makeLine(node.value, sign.added);
      case 'deleted':
        return makeLine(node.value, sign.deleted);
      case 'unchanged':
        return makeLine(node.value, sign.unchanged);
      case 'changed':
        return [`${makeLine(node.firstValue, sign.deleted)}`,
          `${makeLine(node.secondValue, sign.added)}`].join('\n');
      case 'nested':
        return `${ind}${node.name}: ${['{', ...iter(node.children, depth + 1), `${ind}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;
