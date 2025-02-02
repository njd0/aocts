import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

const cardValues1: {[k: string]: number} = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

function gradeHand1(hand: string) {
  const handMap = hand.split('').reduce(
    (prev, curr) => {
      if (!prev[curr]) prev[curr] = 0;
      prev[curr]++;
      return prev;
    },
    {} as {[k: string]: number},
  );

  const count = Object.keys(handMap).length;
  if (count === 1) {
    // 5 of a kind
    return '6';
  } else if (count === 2) {
    for (const k in handMap) {
      // 4 of a kind
      if (handMap[k] === 4) return '5';
      // full house
      else if (handMap[k] === 3) return '4';
    }
  } else if (count === 3) {
    for (const k in handMap) {
      // three of a kind
      if (handMap[k] === 3) return '3';
      // two pair
      if (handMap[k] === 2) return '2';
    }
  } else if (count === 4) {
    return '1';
  }

  return '0';
}

function Part1() {
  const data = readFile('./src/day7/puzzle.txt');

  const types: string[][] = [];

  data.forEach((line: string) => {
    const input = line.split(' ');
    const hand = input[0];
    const wager = input[1];
    // grade hand
    types.push([hand, gradeHand1(hand), wager]);
  });

  types.sort((a: string[], b: string[]) => {
    const [aHand, aGrade] = a;
    const [bHand, bGrade] = b;

    if (aGrade > bGrade) return 1;
    else if (bGrade > aGrade) return -1;
    for (let i = 0; i < aHand.length; ++i) {
      if (aHand[i] === bHand[i]) continue;
      return cardValues1[aHand[i]] - cardValues1[bHand[i]];
    }

    console.error('SHOULD NEVER BE HERE: DUPLICATE HANDS');
    return 0;
  });

  let total = 0;
  for (let i = 0; i < types.length; ++i) {
    total += Number(types[i][2]) * (i + 1);
  }
  console.log('Part 1 Answer', total);
}

const cardValues2: {[k: string]: number} = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 1,
  Q: 12,
  K: 13,
  A: 14,
};

function gradeHand2(hand: string) {
  let jokers = 0;
  const handMap = hand.split('').reduce(
    (prev, curr) => {
      if (curr === 'J') {
        jokers++;
        return prev;
      }
      if (!prev[curr]) prev[curr] = 0;
      prev[curr]++;
      return prev;
    },
    {} as {[k: string]: number},
  );

  const count = Object.keys(handMap).length;
  if (count === 0 || count === 1) {
    // all jokers or 5 of a kind
    return '6';
  } else if (count === 2) {
    for (const k in handMap) {
      // 4 of a kind
      if (handMap[k] + jokers === 4) return '5';
    }
    // full house
    return '4';
  } else if (count === 3) {
    for (const k in handMap) {
      // three of a kind
      if (handMap[k] + jokers === 3) return '3';
    }
    // two pair
    return '2';
  } else if (count === 4) {
    return '1';
  }

  return '0';
}

function Part2() {
  const data = readFile('./src/day7/puzzle.txt');

  const types: string[][] = [];

  data.forEach((line: string) => {
    const input = line.split(' ');
    const hand = input[0];
    const wager = input[1];
    // grade hand
    types.push([hand, gradeHand2(hand), wager]);
  });

  types.sort((a: string[], b: string[]) => {
    const [aHand, aGrade] = a;
    const [bHand, bGrade] = b;

    if (aGrade > bGrade) return 1;
    else if (bGrade > aGrade) return -1;
    for (let i = 0; i < aHand.length; ++i) {
      if (aHand[i] === bHand[i]) continue;
      return cardValues2[aHand[i]] - cardValues2[bHand[i]];
    }

    console.error('SHOULD NEVER BE HERE: DUPLICATE HANDS');
    return 0;
  });

  let total = 0;
  for (let i = 0; i < types.length; ++i) {
    total += Number(types[i][2]) * (i + 1);
  }
  console.log('Part 2 Answer', total);
}

export default puzzleContainer(Part1, Part2);
