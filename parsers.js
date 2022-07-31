import { load } from 'js-yaml';

export const parsers = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error('Unknown fornmat. You can use JSON or YAML formats.');
  }
};
