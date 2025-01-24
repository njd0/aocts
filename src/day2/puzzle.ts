import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

type Pull = {
  [c: string]: number;
};

const FullBagPull: Pull = {
  red: 12,
  green: 13,
  blue: 14,
};

function LoadInputs() {
  const games: {
    [k: string]: Pull[];
  } = {};
  const data = readFile('./src/day2/puzzle.txt');

  data.forEach(line => {
    const gameSet = line.split(':');
    const gameNumber = gameSet[0].match(/\d+/);
    if (!gameNumber) return;

    games[gameNumber.toString()] = [];
    const pulls = gameSet[1].split(';');

    pulls.forEach(pull => {
      const regex = /(?<number>\d+)\s(?<color>\w+)/g;
      const matches = Array.from(pull.matchAll(regex));

      if (matches) {
        const sets = matches.reduce((prev, curr) => {
          if (!curr.groups) return prev;

          const {color, number} = curr.groups;
          prev[color] = Number(number);
          return prev;
        }, {} as Pull);

        games[gameNumber.toString()].push(sets);
      }
    });
  });

  return games;
}

export function Part1() {
  const games = LoadInputs();

  let total = 0;
  for (const [gameId, pulls] of Object.entries(games)) {
    let valid = true;
    pulls.forEach(pull => {
      for (const key in pull) {
        if (pull[key] > FullBagPull[key]) {
          valid = false;
        }
      }
    });

    if (valid) {
      total += Number(gameId);
    }
  }

  console.log({total});
}

export function Part2() {
  const games: {
    [k: string]: Pull;
  } = {};
  const data = readFile('./src/day2/puzzle.txt');

  let total = 0;
  data.forEach(line => {
    let power = 1;
    const gameSet = line.split(':');
    const gameNumber = gameSet[0].match(/\d+/);
    if (!gameNumber) return;

    games[gameNumber.toString()] = {};

    const regex = /(?<number>\d+)\s+(?<color>\w+)(?:,|;|$)/g;
    const pulls = Array.from(gameSet[1].matchAll(regex));

    const minPull: Pull = {};
    pulls.forEach(pull => {
      if (!pull.groups) return;

      const {color, number} = pull.groups;
      minPull[color] =
        !minPull[color] || Number(number) > minPull[color]
          ? Number(number)
          : minPull[color];
    });

    for (const key in minPull) {
      power *= minPull[key];
    }

    total += power;
  });

  console.log({total});
}

export default puzzleContainer(Part1, Part2);
