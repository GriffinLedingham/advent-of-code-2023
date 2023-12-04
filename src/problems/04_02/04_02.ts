import { time, timeEnd } from "../../utils/time";

export const solve04_02 = (input: string) => {
  time("solve04_02");

  const preSolvedGames = {} as Record<number, { copies: number; wins: number }>;
  input.split("\n").forEach((line, index) => {
    // Split the line at : and then split at |
    const [winning, chosen] = line.split(":")[1].split("|");
    const [winningSplit, chosenSplit] = [
      winning.split(" ").filter(Boolean),
      chosen.split(" ").filter(Boolean),
    ];
    // Pre-compute the wins for each card, and assign a single copy for the "real" card
    const card = {
      copies: 1,
      wins: chosenSplit.filter((choice) => winningSplit.includes(choice))
        .length,
    };
    preSolvedGames[index] = card;
  });

  // Iterate all cards, and assign X copies to the next Y cards, where X is copies of the current card
  // We know that cards can't retroactively have copies added, so we can just iterate in order
  // and use current copies to increment down
  let cardsSum = 0;
  Object.values(preSolvedGames).forEach((card, index) => {
    cardsSum += card.copies;
    for (let i = 0; i < card.wins; i++) {
      preSolvedGames[index + i + 1].copies += card.copies;
    }
  });

  timeEnd("solve04_02");
  return cardsSum;
};
