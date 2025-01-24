type Puzzle = () => unknown;

export default function puzzleContainer(part1: Puzzle, part2: Puzzle) {
  return {
    part1,
    part2,
  };
}
