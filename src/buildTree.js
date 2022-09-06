import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { name: key, value: data1[key], type: 'deleted' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { name: key, children: buildTree(data1[key], data2[key]), type: 'nested' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, firstValue: data1[key], secondValue: data2[key], type: 'changed',
      };
    }

    return { name: key, value: data1[key], type: 'unchanged' };
  });
};

export default buildTree;
