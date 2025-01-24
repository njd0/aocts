import fs from 'fs';
import readline from 'readline';

function readFile(filePath: string) {
  // // Creating a readable stream from file
  // // readline module reads line by line
  // // but from a readable stream only.
  // const file = readline.createInterface({
  //   input: fs.createReadStream(filePath),
  //   output: process.stdout,
  //   terminal: false,
  // });

  // file.on('line', processFile);
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}

export default readFile;
