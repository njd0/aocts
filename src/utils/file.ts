import fs from 'fs';

function readFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}

export function writeFile(filePath: string, data: string[]) {
  try {
    fs.writeFileSync(filePath, data.join('\n'));
  } catch (err) {
    console.error(err);
  }
}
export default readFile;
