import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

export function Part1() {
  const inputs: number[] = [];
  const data = readFile('./src/day1/puzzle.txt');

  data.forEach(line => {
    const matches = Array.from(line.matchAll(/\d{1}/g));
    // console.log([matches[0][0], matches[matches.length - 1][0]]);
    inputs.push(Number(`${matches[0][0]}${matches[matches.length - 1][0]}`));
  });

  const sum = inputs.reduce((prev, curr) => prev + curr, 0);
  console.log({sum});
}

const swap: {
  [k: string]: string;
} = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

export function Part2() {
  const inputs: number[] = [];
  const data = readFile('./src/day1/puzzle.txt');

  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d{1}))/g;
  data.forEach(line => {
    let m;
    const numbers: string[] = [];

    // look ahead regex matching is weird...
    while ((m = regex.exec(line)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach(match => {
        if (match) {
          numbers.push(match);
        }
      });
    }
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    const firstNumber = swap[first] ? swap[first] : first;
    const lastNumber = swap[last] ? swap[last] : last;
    inputs.push(Number(`${firstNumber}${lastNumber}`));
  });

  const sum = inputs.reduce((prev, curr) => prev + curr, 0);
  console.log('Part 2 Answer', sum);
}

export default puzzleContainer(Part1, Part2);
