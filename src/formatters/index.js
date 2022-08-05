import makeStylish from './stylish.js';
import makePlain from './plain.js';

const getFormat = (data, format, replacer) => {
    switch (format) {
      case 'stylish':
        return makeStylish(data, replacer);
        case 'plain':
        return makePlain(data);
      default:
        throw new Error(`Invalid file format: '${format}'`);
    }
  };

  export default getFormat;