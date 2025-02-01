import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

function Part1() {
  const data = readFile('./src/day4/puzzle.txt');
  // create a map of cards, keyd by numbers, values winnning #s and ur #s
  // create a map of winning #s for O(1) lookup
  // count # of winning # matches for each card
  // total all points
  let total = 0;
  data.forEach((line: string) => {
    const card = line.split(':');
    const lottoNumbers = card[1].split('|');

    let pow = -1;
    const winningNumbers = Array.from(lottoNumbers[0].matchAll(/\d+/g)).reduce(
      (prev, curr) => {
        prev[curr[0]] = true;
        return prev;
      },
      {} as {[k: string]: boolean},
    );

    Array.from(lottoNumbers[1].matchAll(/\d+/g)).forEach(num => {
      if (winningNumbers[num[0]]) {
        pow++;
      }
    });

    if (pow !== -1) {
      total += Math.pow(2, pow);
    }
  });

  console.log('Part 1 Answer', total);
}

function Part2() {
  const data = readFile('./src/day4/puzzle.txt');
  // create a map of cards, keyd by number and value of number of matches
  // create a map of cards, keyd by number and # of copies, starts with 1 for all
  // for each card, # of points gives extra cards of other #s
  // start at 1, for each win, inc which card to give +1
  // so, card, calc # of cards to give * n, n = number of copies
  const numWins: {[k: string]: number} = {};
  const numCopies: {[k: string]: number} = {};
  data.forEach((line: string) => {
    const card = line.split(':');
    const cardNumber = card[0].match(/\d+/)?.[0] || '';
    const lottoNumbers = card[1].split('|');
    numCopies[cardNumber] = 1;

    // map of winning numbers
    const winningNumbers = Array.from(lottoNumbers[0].matchAll(/\d+/g)).reduce(
      (prev, curr) => {
        prev[curr[0]] = true;
        return prev;
      },
      {} as {[k: string]: boolean},
    );

    // how many winning #s per card
    Array.from(lottoNumbers[1].matchAll(/\d+/g)).forEach(num => {
      if (winningNumbers[num[0]]) {
        if (!numWins[cardNumber]) {
          numWins[cardNumber] = 0;
        }
        numWins[cardNumber]++;
      }
    });
  });

  Object.entries(numWins).forEach(([cardNum, wins]) => {
    if (wins) {
      let tmp = wins;
      while (tmp) {
        const copies = numCopies[cardNum];
        numCopies[Number(cardNum) + tmp] += copies;
        tmp--;
      }
    }
  });

  const total = Object.values(numCopies).reduce((prev, cur) => {
    prev += cur;
    return prev;
  }, 0);

  console.log('Part 2 Answer', total);
}

export default puzzleContainer(Part1, Part2);
