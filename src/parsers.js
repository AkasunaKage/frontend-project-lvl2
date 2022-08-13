import { load } from 'js-yaml';

const parsers = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error('Invalid fornmat. You can use only JSON or YAML formats.');
  }
};

export default parsers;
