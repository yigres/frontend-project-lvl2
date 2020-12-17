import _ from 'lodash';

const makeAst = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  return keys.map((key) => {
    if (!_.has(object2, key)) {
      return {
        name: key,
        type: 'removed',
        value: object1[key],
      };
    }
    if (!_.has(object1, key)) {
      return {
        name: key,
        type: 'added',
        value: object2[key],
      };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        name: key,
        type: 'nested',
        children: makeAst(object1[key], object2[key]),
      };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return {
        name: key,
        type: 'equal',
        value: object1[key],
      };
    }
    return {
      name: key,
      type: 'updated',
      oldValue: object1[key],
      newValue: object2[key],
    };
  });
};

export default makeAst;
