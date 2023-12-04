import { time, timeEnd } from "../../utils/time";

export const solve04_01 = (input: string) => {
  time("solve04_01");

  const sum = input
    .split("\n")
    .map((line) => {
      // Split the line at : and then split at |
      const [winning, chosen] = line.split(":")[1].split("|");
      const [winningSplit, chosenSplit] = [
        winning.split(" ").filter(Boolean),
        chosen.split(" ").filter(Boolean),
      ];
      return {
        // Any chosen number that appears in winning numbers is a win
        wins: chosenSplit.filter((choice) => winningSplit.includes(choice))
          .length,
      };
    })
    .filter((game) => game.wins > 0)
    .reduce((acc, game) => {
      // Sum based on the "first win is one point, every win after doubles it - simple 2^n-1
      return acc + Math.pow(2, game.wins - 1);
    }, 0);

  timeEnd("solve04_01");
  return sum;
};
