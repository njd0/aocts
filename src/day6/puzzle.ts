import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

function Part1() {
  const data = readFile('./src/day6/puzzle.txt');

  const time: number[] = [];
  const distance: number[] = [];

  data.forEach((line: string) => {
    if (line.startsWith('Time')) {
      time.push(...Array.from(line.matchAll(/\d+/g)).map(n => Number(n[0])));
    } else if (line.startsWith('Distance')) {
      distance.push(
        ...Array.from(line.matchAll(/\d+/g)).map(n => Number(n[0])),
      );
    }
  });

  let total = 1;
  for (let i = 0; i < time.length; ++i) {
    const raceTime = time[i];
    const raceDistance = distance[i];
    let wins = 0;
    for (let t = 1; t < raceTime; ++t) {
      const distanceTraveled = t * (raceTime - t);
      if (distanceTraveled > raceDistance) {
        wins++;
      }
    }
    total *= wins;
  }

  console.log('Part 1 Answer', total);
}

function Part2() {
  const data = readFile('./src/day6/puzzle.txt');

  let time;
  let distance;
  data.forEach((line: string) => {
    if (line.startsWith('Time')) {
      time = Number(
        Array.from(line.matchAll(/\d+/g))
          .map(m => m[0])
          .join(''),
      );
    } else if (line.startsWith('Distance')) {
      distance = Number(
        Array.from(line.matchAll(/\d+/g))
          .map(m => m[0])
          .join(''),
      );
    }
  });

  if (!time || !distance) return;

  // d = (t-x) * x = a parabola function of possible distances
  // find point where wins start to happen
  const x = (time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;
  // map x to an integer where wins start to occur
  const x_above = Math.floor(x) + 1;
  // wins is where total time - the "losing sections" of parabola curve
  const wins = time - x_above * 2;
  console.log('Part 2 Answer', wins);
}

export default puzzleContainer(Part1, Part2);
