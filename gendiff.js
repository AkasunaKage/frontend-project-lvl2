import { Command } from 'commander/esm.mjs';
import { genDiff, getFiles } from './index.js';
const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const filesContent = getFiles(filePath1, filePath2);
    console.log(genDiff(filesContent[0], filesContent[1]));
  });
program.parse();
