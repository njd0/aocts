import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

function Part1() {
  const data = readFile('./src/day5/puzzle.txt');

  type Predicate = (num: number) => number | boolean;
  const predicateMapper: Predicate[][] = [];
  const seeds: number[] = [];
  let mapIndex = -1;

  data.forEach((line: string) => {
    // intialize seeds array
    if (line.startsWith('seeds')) {
      seeds.push(
        ...Array.from(line.split(':')[1].matchAll(/\d+/g)).map(s =>
          Number(s[0]),
        ),
      );
    } else if (line.length === 0) {
      // index mapping for each map type
      mapIndex++;
    }

    if (/\d+/g.test(line)) {
      const [dest, source, range] = Array.from(line.matchAll(/\d+/g)).map(m =>
        Number(m[0]),
      );

      if (!predicateMapper[mapIndex]) {
        predicateMapper[mapIndex] = [];
      }

      // create mapping predicate based on input range logic
      predicateMapper[mapIndex].push((num: number) => {
        if (num < source || num >= source + range) return false;
        else return num - source + dest;
      });
    }
  });

  let lowestSeedNumber = Infinity;
  seeds.forEach(seed => {
    let source = seed;
    // for each seed, travese each seed mapper in order to get final lowest output
    for (const mapping of predicateMapper) {
      for (const pred of mapping) {
        if (pred(source) === false) continue;
        else {
          source = pred(source) as number;
          break;
        }
      }
    }

    lowestSeedNumber = Math.min(lowestSeedNumber, source);
  });

  console.log('Part 1 Answer', lowestSeedNumber);
}

function Part2() {
  const data = readFile('./src/day5/puzzle.txt');
  const seedRanges: number[][] = [];
  const mapping: number[][][] = [];
  let mapIndex = -1;

  data.forEach((line: string) => {
    // intialize seeds array
    if (line.startsWith('seeds')) {
      Array.from(line.split(':')[1].matchAll(/\d+ \d+/g)).forEach(s => {
        const [min, range] = s[0].split(' ').map(Number);
        seedRanges.push([min, min + range - 1, 0]);
      });
    } else if (line.length === 0) {
      // index mapping for each map type
      mapIndex++;
    } else if (/\d+ \d+ \d+/g.test(line)) {
      if (!mapping[mapIndex]) {
        mapping[mapIndex] = [];
      }

      mapping[mapIndex].push(
        Array.from(line.matchAll(/\d+ \d+ \d+/g))[0][0]
          .split(' ')
          .map(Number),
      );
    }
  });

  // seedRanges needs to be all ranges that no longer need to be mapped
  const answers = [];
  while (seedRanges.length > 0) {
    // get next seedRange that needs mapping
    const [seedMin, seedMax, indx] = seedRanges.shift() as number[];

    // map range to next mapping range
    let seedStart = seedMin;
    let seedEnd = seedMax;

    if (indx >= mapping.length) {
      // end of this seed segment
      answers.push(seedMin);
      continue;
    }

    // try and map seed range for every mapable range per segment
    let inRange = false;
    for (let i = 0; i < mapping[indx].length; ++i) {
      const [dest, source, diff] = mapping[indx][i];
      const sourceMax = source + diff - 1;
      const diffMapping = dest - source;

      if (seedEnd < source || seedStart > sourceMax) {
        // seed is not in range of remap, try next
        continue;
      }

      inRange = true;

      if (seedStart < source) {
        // seed start is less than source, but max lies within range
        seedRanges.push([seedStart, source - 1, indx]);
        seedStart = source;
      } else if (seedEnd > sourceMax) {
        // end is past mappable range, start is within
        seedRanges.push([sourceMax + 1, seedEnd, indx]);
        seedEnd = sourceMax;
      }

      // we have mapped this seed range, go to next range
      seedRanges.push([
        seedStart + diffMapping,
        seedEnd + diffMapping,
        indx + 1,
      ]);
      break;
    }

    // if range has not been mapped, pass through to next range
    if (inRange === false) {
      seedRanges.push([seedStart, seedEnd, indx + 1]);
    }
  }

  console.log('Part 2 Answer:', Math.min(...answers));
}

export default puzzleContainer(Part1, Part2);
