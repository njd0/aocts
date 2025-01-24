import readFile, {writeFile} from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';
import {Vector} from '@/utils/types';
import _ from 'lodash';

type Numbers = {
  [row: number]: {
    num: number;
    startEnd: Vector;
  }[];
};

const replaceAt = function (str: string, index: number, replacement: string) {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

function getKey(x: number | string, y: number | string) {
  return `${x},${y}`;
}
function parseKey(xy: string) {
  return xy.split(',').map(Number);
}

function Part1() {
  // regex all number per line
  // get edges of number
  // check if number edges are in symbole map
  // if count, else dont
  const data = readFile('./src/day3/puzzle.txt');

  let total = 0;
  let row = 0;
  data.forEach(line => {
    const numberMatches = Array.from(line.matchAll(/\d+/g));
    // each number of row
    numberMatches.forEach(number => {
      const num = number[0];
      // gather edges
      const edges: string[][] = [row - 1, row, row + 1].map(r =>
        Array.from({length: num.length + 2}, (_, i) =>
          getKey(i + (number.index - 1), r),
        ),
      );

      const flatEdges = _.flatMap(edges);
      for (let i = 0; i < flatEdges.length; ++i) {
        const key = parseKey(flatEdges[i]);
        const c = data?.[key[1]]?.[key[0]];
        if (c && /[^(.|\d)]/.test(c)) {
          total += Number(num);
          break;
        }
      }
    });

    row++;
  });

  console.log({total});
}

function Part2() {}

export default puzzleContainer(Part1, Part2);
