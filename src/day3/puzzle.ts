import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';
import _ from 'lodash';

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

  console.log('Part 1 Answer: ', total);
}

function Part2() {
  const data = readFile('./src/day3/puzzle.txt');

  // gather all numbers next to gearChar that fit requirements:
  // loop all numbers. if next to *, add * pos to map and array of numbers
  // after number loop, do required math for all values w/ ecxactly 2
  const gearMap: {[k: string]: number[]} = {};
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
        if (c && /\*/.test(c)) {
          const gearKey = getKey(key[0], key[1]);
          if (!gearMap[gearKey]) {
            gearMap[gearKey] = [];
          }
          gearMap[gearKey].push(Number(num));
        }
      }
    });

    row++;
  });

  const total = Object.values(gearMap)
    .filter(arr => arr.length === 2)
    .reduce((prev, curr) => {
      prev += curr[0] * curr[1];
      return prev;
    }, 0);

  console.log('Part 2 Answer', total);
}

export default puzzleContainer(Part1, Part2);
