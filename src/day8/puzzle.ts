import readFile from '@/utils/file';
import puzzleContainer from '@/utils/puzzle';

function Part1() {
  const data = readFile('./src/day8/puzzle.txt');

  const instructions: string[] = [];
  const maze: {[k: string]: string[]} = {};
  let lineNumber = 0;
  data.forEach((line: string) => {
    if (lineNumber === 0) {
      instructions.push(...line.split(''));
      lineNumber++;
    } else if (line.length !== 0) {
      const matches = Array.from(line.matchAll(/\w+/g));
      maze[matches[0][0]] = [matches[1][0], matches[2][0]];
    }
  });

  let steps = 0;
  let pos = 'AAA';
  let indx = 0;
  while (pos !== 'ZZZ') {
    if (instructions[indx] === 'L') {
      pos = maze[pos][0];
    } else {
      pos = maze[pos][1];
    }

    indx = (indx + 1) % instructions.length;
    steps++;
  }

  console.log('Part 1 Answer: ', steps);
}

function gcd(a: number, b: number) {
  let temp = b;
  while (b !== 0) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}
function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

const startingChar = 'A';
const endingChar = 'Z';

function Part2() {
  // start on all nodes that end with A
  // how long until all nodes end with Z
  // for each node track to end case
  // for all nodes, find LCM
  const data = readFile('./src/day8/puzzle.txt');
  const startingNodes: string[] = [];
  const instructions: string[] = [];
  const maze: {[k: string]: string[]} = {};
  let lineNumber = 0;
  data.forEach((line: string) => {
    if (lineNumber === 0) {
      instructions.push(...line.split(''));
      lineNumber++;
    } else if (line.length !== 0) {
      const matches = Array.from(line.matchAll(/\w+/g));
      maze[matches[0][0]] = [matches[1][0], matches[2][0]];
      // gather starting nodes
      if (matches[0][0].endsWith(startingChar)) {
        startingNodes.push(matches[0][0]);
      }
    }
  });

  const results: number[] = [];
  for (let node of startingNodes) {
    let steps = 0;
    while (!node.endsWith(endingChar)) {
      node =
        instructions[steps % instructions.length] === 'L'
          ? maze[node][0]
          : maze[node][1];
      steps++;
    }

    results.push(steps); // how long till end node
  }

  // compare LCM for all node paths
  let answer = results[0];
  for (let i = 1; i < results.length; ++i) {
    answer = lcm(answer, results[i]);
  }

  console.log('Part 2 Answer', answer);
}

export default puzzleContainer(Part1, Part2);
