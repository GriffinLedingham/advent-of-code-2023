import { time, timeEnd } from "../../utils/time";
import { Colors } from "./fixtures/input";

export const solve02_02 = (input: string) => {
  time("solve02_02");
  // Sum all games' power
  const power = input.split("\n").reduce((acc, line) => {
    // Iterate through each game and find the multiplicitive power of the game
    const powerForGame = Object.values(Colors).reduce((acc, color) => {
      return (
        acc *
        // Max all occurences of the color in the line
        Math.max(
          // Math all occurences of the color in the line
          ...(line?.match(new RegExp(`(\\d+) ${color}`, "g")) ?? [])?.map((i) =>
            // Parse the number from the match
            parseInt(i.replace(` ${color}`, ""))
          )
        )
      );
    }, 1);
    return (acc += powerForGame);
  }, 0);
  timeEnd("solve02_02");
  return power;
};

// =================
// Original Solution
// =================
/*
export const solve02_02 = (input: string) => {
  time("solve02_02");

  const lines = input.split("\n");

  let gameIdSums = 0;

  for (const line of lines) {
    const gameId = line.match(/Game (\d+):/)?.[1];

    if (!gameId) throw new Error(`Could not parse game id from line: ${line}`);

    const gameResults = line.replace(`${gameId}:`, "").split(";");

    const maxPerGame = {
      [Colors.Red]: 0,
      [Colors.Green]: 0,
      [Colors.Blue]: 0,
    };

    for (const gameResult of gameResults) {
      const redForGame = gameResult.match(/ (\d+) red/);
      const greenForGame = gameResult.match(/ (\d+) green/);
      const blueForGame = gameResult.match(/ (\d+) blue/);

      if (redForGame && parseInt(redForGame[1]) > maxPerGame[Colors.Red])
        maxPerGame[Colors.Red] = parseInt(redForGame[1]);
      if (blueForGame && parseInt(blueForGame[1]) > maxPerGame[Colors.Blue])
        maxPerGame[Colors.Blue] = parseInt(blueForGame[1]);
      if (greenForGame && parseInt(greenForGame[1]) > maxPerGame[Colors.Green])
        maxPerGame[Colors.Green] = parseInt(greenForGame[1]);
    }

    // None of the above code had to change here...?

    const powerForGame =
      maxPerGame[Colors.Red] *
      maxPerGame[Colors.Green] *
      maxPerGame[Colors.Blue];

    gameIdSums += powerForGame;
  }

  timeEnd("solve02_02");
  return gameIdSums;
};
*/
