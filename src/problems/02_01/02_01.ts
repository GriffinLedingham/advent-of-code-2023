import { Colors, bagConstraints } from "./fixtures/input";

export const solve02_01 = (input: string) => {
  console.time("solve02_01");

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

    if (
      maxPerGame[Colors.Red] <= bagConstraints[Colors.Red] &&
      maxPerGame[Colors.Green] <= bagConstraints[Colors.Green] &&
      maxPerGame[Colors.Blue] <= bagConstraints[Colors.Blue]
    )
      gameIdSums += parseInt(gameId);
  }

  console.timeEnd("solve02_01");
  return gameIdSums;
};
