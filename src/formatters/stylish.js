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
  const forTree = (tree, depth) => tree.map((node) => {
    const ind = replacer.repeat(depth);
    const indForSign = ind.slice(2);

    const createLine = (value, mark) => `${indForSign}${mark} ${node.key}: ${stringify(value, depth, replacer)}`;

    switch (node.type) {
      case 'added':
        return createLine(node.value, sign.added);
      case 'deleted':
        return createLine(node.value, sign.deleted);
      case 'unchanged':
        return createLine(node.value, sign.unchanged);
      case 'changed':
        return [`${createLine(node.firstValue, sign.deleted)}`,
          `${createLine(node.secondValue, sign.added)}`].join('\n');
      case 'nested':
        return `${ind}${node.name}: ${['{', ...forTree(node.children, depth + 1), `${ind}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = forTree(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;