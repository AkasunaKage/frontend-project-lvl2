import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const makePlain = (diff) => {
  const iter = (tree, ancestor) => {
    if (!_.isObject(tree)) {
      return `${tree}`;
    }

    const makeFormatter = Object.entries(tree).map(([, node]) => {
      switch (node.type) {
        case 'added':
          return `Property '${ancestor}${node.name}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${ancestor}${node.name}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${ancestor}${node.name}' was updated. From ${stringify(node.firstValue)} to ${stringify(node.secondValue)}`;
        case 'nested':
          return iter(node.children, `${ancestor}${node.name}.`);
        default:
          throw new Error(`Type: ${node.type} is undefined`);
      }
    });

    return _.compact([...makeFormatter]).join('\n');
  };
  return iter(diff, '');
};

export default makePlain;
